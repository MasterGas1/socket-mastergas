import { Request, Response } from "express";

import Address from './address.model'

import { badRequest, internalServerError, notFound, okRequest } from "../helper/handleResponse";
import validateRouteBody from "../helper/validateRoute";
import parseMongoId from "../helper/parseMongoId";


export const createAddress = async (req: Request, res: Response) => {

    
    const {body} = req;
    
    try{
        if(validateRouteBody(req,res))
             return;
        
        const isRepeat = await Address.findOne({name: body.name}); //Verify if the name is repeat on the db

        if(isRepeat){
            return badRequest(res, 'The address is already registered');
        }

        const address = new Address(body);// Create the object

        await address.save(); // Save the object

        okRequest(res,address);

    }catch(error){
        console.log(error);
        return internalServerError(res);
    }
}

export const getAllAddresses = async (req: Request, res: Response) => {
    try{
        const address = await Address.find(); // Find all the address

        okRequest(res,address); // return the address

    }catch(error){
        console.log(error);

        return internalServerError(res);
    }
}

export const getByIdAddress = async (req: Request, res: Response) => {

    const {id} = req.params;

    try{
        if(!parseMongoId(id))// Verify if the id is valid
            return badRequest(res, 'The id is not uuid');

        const address = await Address.findById(id);// Find adrress by id

        okRequest(res,address);
    }catch(error) {
        console.log(error);

        return internalServerError(res)
    }
}

export const updateAddress = async (req: Request, res: Response) => {

    const {id} = req.params;

    const {body} = req;

    try {
        if(validateRouteBody(req,res))
            return;

        if(!parseMongoId(id))// Verify if the id is valid
            return badRequest(res, 'The id is not uuid');

        let address = await Address.findById(id);// Find the address by Id

        if(!address){
            return notFound(res, 'The address id not found');// The adress wasn't found
        }

        address = await Address.findOne({name: body.name});// find the address by name

        if (address) {
            return badRequest(res, 'The address is already registered')
        }

        address = await Address.findByIdAndUpdate(id, body,{new: true})

        okRequest(res,address);

    } catch (error) {
        console.log(error);

        return internalServerError(res);
    }
}

export const deleteAddress = async (req: Request, res: Response) => {

    const {id} = req.params;

    try{
        if(!parseMongoId(id))
            return badRequest(res, 'The id is not uuid');

            let address = await Address.findById(id);

            if(!address){
                return notFound(res, 'The address id not found');
            }

            await Address.findByIdAndDelete(id);

            okRequest(res, 'Address was deleted')
    }catch(error){
        console.log(error);

        return internalServerError(res)
    }
}