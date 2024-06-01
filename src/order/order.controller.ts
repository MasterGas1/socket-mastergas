import { Request, Response } from "express";
import { badRequest, handleErrorResponse, internalServerError, okRequest } from '../helper/handleResponse';
import validateRouteBody from "../helper/validateRoute";
import parseMongoId from "../helper/parseMongoId";
import messages from "../helper/messages";
import { createOrder, getAllOrders, getOneOrder } from "./order.service";

export const postOrder = async (req: Request, res: Response) => {

    const response = validateRouteBody(req, res);

    if (response)
        return response;

    try {
        const order = await createOrder(req.body);

        okRequest(res, order);
    } catch (error: any) {
        console.log(error.message);
        return handleErrorResponse(res, error.message);
    }
}

export const getOrders = async (req: Request, res: Response) => {
    try{
        const orders = await getAllOrders();
        okRequest(res, orders);
    }catch(error: any){
        console.log(error.message);
        return handleErrorResponse(res, error.message);
    }
}

export const getOrder = async (req: Request, res: Response) => {
    try{
        const { id } = req.params;

        if(!parseMongoId(id)) //Checks if the id is a uuid
            return badRequest(res,'The id is not uuid');

        const order = await getOneOrder(id);
        okRequest(res, order);
    }catch(error: any){
        console.log(error.message);
        return handleErrorResponse(res, error.message);
    }
}