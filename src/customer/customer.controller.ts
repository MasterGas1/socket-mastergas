import { Request, Response } from "express";

import Customer from './customer.model';
import User from '../user/user.model'

import { badRequest, internalServerError, notFound, okRequest } from "../helper/handleResponse";
import validateRouteBody from "../helper/validateRoute";
import parseMongoId from "../helper/parseMongoId";


export const createCustomer = async (req: Request, res: Response) => {
    const { body } = req;
    
    if(validateRouteBody(req,res))
        return;
    
    const session = await User.startSession();

    try {

        session.startTransaction()

        const customer:any = await Customer.create([body.customer],{session})

        delete body.customer
        const userBody = {
            ...body,
            customer_id: customer[0]._id
        }

        const user = await User.create([userBody],{session})

        await session.commitTransaction()
        session.endSession()

        okRequest(res, user[0]);
    } catch (error) {
        await session.abortTransaction();
        session.endSession()
        console.log(error);
        return internalServerError(res);
    }
}

export const getAllCustomers = async (req: Request, res: Response) => {
    try{
        const customer = await Customer.find();

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