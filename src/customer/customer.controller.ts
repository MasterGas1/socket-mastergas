import { Request, Response } from "express";
import { badRequest, internalServerError, okRequest } from "../helper/handleResponse";
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