import { Request, Response } from "express";

import Customer from './customer.model';

import {createCustomerService, getCustomerByTokenService, updateCustomerByTokenService, deleteCustomerByTokenService} from './customer.service'

import { badRequest, handleErrorResponse, internalServerError, notFound, okRequest, preconditionRequiredRequest, unauthorized } from "../helper/handleResponse";
import validateRouteBody from "../helper/validateRoute";
import parseMongoId from "../helper/parseMongoId";

import { RequestMiddle } from "../user/user.middleware";

export const createCustomer = async (req: Request, res: Response) => {
    
    if(validateRouteBody(req,res))
        return;

    try {
        
        const token = await createCustomerService(req.body);
        return okRequest(res, {token});

    } catch (error: any) {
        return handleErrorResponse(res, error.message);
    }
}

export const getCustomerByToken = async (req: RequestMiddle, res: Response) => {
    try{
        const customer = await getCustomerByTokenService(req.userId)

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
    
    if(!parseMongoId(userId)) {
        return badRequest(res, 'The id is not uuid');
    }
    
    try {
        
        let user = await updateCustomerByTokenService({...body, userId});
        
        okRequest(res, user)
    }catch(error:any){
        return handleErrorResponse(res, error.message);
    }
}

export const deleteByTokenCustomer = async (req: RequestMiddle, res: Response) => {
    const  id  = req.userId;

    if(!parseMongoId(id)){
        throw  new Error('400-The id is not uuid');
    }

    try{
        const msg = await deleteCustomerByTokenService(id ?? '')

        okRequest(res, msg);
    }catch(error){
        console.log(error);
        return internalServerError(res);
    }
}