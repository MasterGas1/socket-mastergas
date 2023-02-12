import { Request, Response } from "express";

import Service from './service.model';

import { internalServerError, okRequest } from '../helper/handleResponse';

export const createService = async (req: Request,res: Response) => {
        
    try{
        
        const {body} = req;
        
        const service = new Service(body); //Create service

        await service.save(); //Save new service

        okRequest(res,service) //Return service

    }catch(error){
        console.log(error)
        return internalServerError(res) // Return server error
    }
}