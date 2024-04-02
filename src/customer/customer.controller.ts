import { Request, Response } from "express";

import {createCustomerService, getCustomerByTokenService, updateCustomerByTokenService, deleteCustomerByTokenService} from './customer.service'

import { badRequest, handleErrorResponse, internalServerError, notFound, okRequest, preconditionRequiredRequest, unauthorized } from "../helper/handleResponse";
import validateRouteBody from "../helper/validateRoute";
import parseMongoId from "../helper/parseMongoId";

import { RequestMiddle } from "../user/user.middleware";

export const createCustomer = async (req: Request, res: Response) => {
    
    if(validateRouteBody(req,res))
        return;

    try {
        
        const response = await createCustomerService(req.body);
        return okRequest(res, response);

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