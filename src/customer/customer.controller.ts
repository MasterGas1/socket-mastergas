import mongoose from "mongoose";
import { Request, Response } from "express";
import * as bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';

import Customer from './customer.model';
import User from '../user/user.model'
import Roles from "../roles/roles.model";

import { badRequest, internalServerError, notFound, okRequest, preconditionRequiredRequest, unauthorized } from "../helper/handleResponse";
import validateRouteBody from "../helper/validateRoute";
import parseMongoId from "../helper/parseMongoId";

import { RequestMiddle } from "../user/user.middleware";

import { userProps } from "../interfaces/user.interface";
import { customerProps } from "../interfaces/customer.interface";


export const createCustomer = async (req: Request, res: Response) => {
    
    if(validateRouteBody(req,res))
        return;
    
    const { body } = req;
    const {email,password} = body
    const {rfc} = body.customer
    
    const session = await mongoose.startSession();

    try {

        const isRepeatedCustomer = await Customer.findOne({rfc})
        const isRepeatedEmail = await User.findOne({email})

        if(isRepeatedEmail){
            return badRequest(res, `User with email: ${email} is repeated`)
        }

        if(isRepeatedCustomer){
            return badRequest(res,`Customer with rfc: ${rfc} is repeated`)
        }


        session.startTransaction() // Start transaction, help us if there a problem when we are creating both collections make a roleback

        const customer:any = await Customer.create([body.customer],{session})

        delete body.customer //Delete property customer of the body

        const role = await Roles.findOne({name: "customer"}) //Get the role

        if (!role) { //Validate if the role doesn't exist
            return preconditionRequiredRequest(res,{msg: "It's necessary to ejecute seeder role before to call this end-point"})
        }

        const userBody = { //Create new body with new field customer_id
            ...body,
            role_id: role._id, 
            password: bcrypt.hashSync(password,10),
            status: "approved",
            customer_id: customer[0]._id  // Customer with session always returns an array
        }

        const user = await User.create([userBody],{session}) //Create user with customer id

        await session.commitTransaction() // Do the transaction create both collections
        session.endSession()
        
        const secretKey = process.env.SECRET_KEY || "S3CR3TK3Y$"

        const token = jwt.sign({id: user[0]._id}, secretKey)

        okRequest(res, {token});
    } catch (error) {
        await session.abortTransaction(); //If there are a error delete all actions
        session.endSession()
        console.log(error);
        return internalServerError(res);
    }
}

export const getCustomerByToken = async (req: RequestMiddle, res: Response) => {
    try{

        const customer = await User.findById(req.userId)
            .populate([{path: "role_id", select: "-_id"},{path: "customer_id", select: "-_id"}])
                .select("-password -status");

        okRequest(res,customer);
    }catch(error){
        console.log(error);

        return internalServerError(res);
    }
}

export const getByIdCustomers = async (req: Request, res: Response) => {
    
    const {id} = req.params;

    try {
        if(!parseMongoId(id))
            return badRequest(res, 'The id is nod uuid');

        const customer = await Customer.findById(id);

        okRequest(res, customer);
    } catch (error) {
        console.log(error);

        return internalServerError(res);
    }
}

export const updateCustomerByToken = async (req: RequestMiddle, res: Response) => {

    if(validateRouteBody(req,res))
        return;

    const {userId} = req;

    const {body} = req;

    delete body.role_id
    delete body.createdAt
    delete body.customer_id
    delete body.status
    delete body.deleted

    const session = await mongoose.startSession();

    try {
        
        if(!parseMongoId(userId)) {
            return badRequest(res, 'The id is not uuid');
        }
        
        let user = await User.findById(userId);

        if (!user) {
            return notFound(res, 'The customer id not found')
        }

        if (!bcrypt.compareSync(body.password,user.password)){
            return unauthorized(res,'Credentials are not valid (paswword)')
        }

        delete body.password

        const repeatedEmail = await User.findOne({email: body.email})

        if (repeatedEmail) {
            return badRequest(res, `The email ${body.email} allready exist`)
        }

        session.startTransaction()

        let customer = await Customer.findById(user?.customer_id)

        if (!customer){
            return badRequest(res,'The customer dont exist')
        }

        customer = await Customer.findOne({rfc: body.rfc})

        if (customer) {
            return badRequest(res, 'The rfc is already registered')
        }

        customer = await Customer.findByIdAndUpdate(user?.customer_id, body,{new: true}).session(session)
        
        user = await User.findByIdAndUpdate(userId, body, {new: true}).session(session).populate([{path: "role_id", select: "-_id"},{path: "customer_id", select: "-_id"}])
        .select("-password -status");

        await session.commitTransaction() // Do the transaction create both collections
        await session.endSession() 

        okRequest(res, user)
    }catch(error){
        console.log(error);
        session.abortTransaction()
        session.endSession()
        return internalServerError(res);
    }
}

export const deleteByTokenCustomer = async (req: RequestMiddle, res: Response) => {
    const  id  = req.userId;

    try{
        if(!parseMongoId(id)){
            return badRequest(res, 'The id is not uuid');
        }

        let user = await User.findById(id);

        if(!user){
            return notFound(res, 'The user id not found');
        }

        let customer = await Customer.findById(user.customer_id)

        if (!customer) {
            return notFound(res, 'The customer id not found')
        }

        await user.delete()
        await customer?.delete()

        okRequest(res,{msg: 'User was deleted'});
            
    }catch(error){
        console.log(error);
        return internalServerError(res);
    }
}