import { Request, Response } from "express";
import * as bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';

import Customer from './customer.model';
import User from '../user/user.model'
import Roles from "../roles/roles.model";

import { badRequest, internalServerError, notFound, okRequest, preconditionRequiredRequest } from "../helper/handleResponse";
import validateRouteBody from "../helper/validateRoute";
import parseMongoId from "../helper/parseMongoId";
import mongoose from "mongoose";


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

// export const getAllCustomers = async (req: Request, res: Response) => {
//     try{
//         const customer = await Customer.find();

//         okRequest(res,customer);
//     }catch(error){
//         console.log(error);

//         return internalServerError(res);
//     }
// }

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

export const updateCustomer = async (req: Request, res: Response) => {

    const {id} = req.params;

    const {body} = req;

    try {
        if(validateRouteBody(req,res))
            return;
        
        if(!parseMongoId(id))
            return badRequest(res, 'The id is not uuid');

        let customer = await Customer.findById(id);

        if (!customer) {
            return notFound(res, 'The customer id not found')
        }

        customer = await Customer.findOne({rfc: body.rfc})

        if (customer) {
            return badRequest(res, 'The customer is already registered')
        }

        customer = await Customer.findByIdAndUpdate(id, body,{new: true})

        okRequest(res, customer)
    }catch(error){
        console.log(error);

        return internalServerError(res);
    }
}

export const deleteCustomer = async (req: Request, res: Response) => {
    const { id } = req.params;

    try{
        if(!parseMongoId(id))
            return badRequest(res, 'The id is not uuid');

            let customer = await Customer.findById(id);

            if(!customer){
                return notFound(res, 'The customer id not found');
            }

            await Customer.findByIdAndDelete(id);

            okRequest(res, 'Customer was deleted');
            
    }catch(error){
        console.log(error);

        return internalServerError(res);
    }
}