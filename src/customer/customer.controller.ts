import { Request, Response } from "express";
import { badRequest, internalServerError, notFound, okRequest } from "../helper/handleResponse";
import parseMongoId from "../helper/parseMongoId";
import validateRouteBody from "../helper/validateRoute";
import Customer from './customer.model';


export const createCustomer = async (req: Request, res: Response) => {
    const { body } = req;

    try {
        if(validateRouteBody(req,res))
            return;
        
        const isRepeat = await Customer.findOne({rfc: body.rfc});

        if (isRepeat) {
            return badRequest(res, 'The Customer is already registered');
        }

        const customer = new Customer(body);

        await customer.save();

        okRequest(res, customer);
    } catch (error) {
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