import { Request, Response } from 'express';

import TypeService from './type-service.model';

import validateRouteBody from '../helper/validateRoute';
import { okRequest, badRequest, internalServerError, notFound } from '../helper/handleResponse';
import parseMongoId from '../helper/parseMongoId';

export const createTypeService = async (req: Request, res:Response) => {

    validateRouteBody(req,res); //Validate body of request
    
    const {body} = req

    try{

        const isRepeated = await TypeService.findOne({name: body.name}); // Find if the name is already exist

        if(isRepeated){
            return badRequest(res,'The type-service is already registered') // Return bad request
        }

        const typeService = new TypeService(body); // Create the object

        await typeService.save(); // Save the object

        okRequest(res,typeService) //Return typeService object

    }catch(error){
        console.log(error);
        return internalServerError(res) // Return server error
    }
}

export const getAllTypeServices = async (req: Request, res: Response) => {
    try{

        const typeServices = await TypeService.find(); //Find all the type-services
    
        okRequest(res,typeServices) //Return typeService object

    }catch(error){
        console.log(error)

        return internalServerError(res) // Return server error
    }
}

export const getByIdTypeServices = async (req: Request, res: Response) => {
    const {id} = req.params

    try{
        if(!parseMongoId(id)) //Checks if the id is a uuid
            return badRequest(res,'The id is not uuid');

        const typeService = await TypeService.findById(id) // Find typeService by id

        okRequest(res,typeService) //Return typeService object

    }catch(error){
        console.log(error)

        return internalServerError(res) // Return server error
    }
}

export const updateTypeService = async (req: Request, res: Response) => {

    const {id} = req.params

    const {body} = req
 
    try{
        validateRouteBody(req,res); //Validate body of request

        if(!parseMongoId(id)) //Checks if the id is a uuid
            return badRequest(res,'The id is not uuid');

        let typeService = await TypeService.findById(id); // Find if exist the typeService

        if(!typeService){
            return notFound(res,'The type-service id not found');
        }

        typeService = await TypeService.findOne({name: body.name}); // Find if the name is already exist

        if(typeService){
            return badRequest(res,'The type-service is already registered') // Return bad request
        }

        typeService = await TypeService.findByIdAndUpdate(id,body,{new: true}) // Update

        okRequest(res,typeService) //Return typeService object

    }catch(error){
        console.log(error)

        return internalServerError(res) // Return server error
    }
}

export const deleteTypeService = async (req: Request, res: Response) => {
    const {id} = req.params;

    try{
        if(!parseMongoId(id)) //Checks if the id is a uuid
            return badRequest(res,'The id is not uuid');

        let typeService = await TypeService.findById(id); // Find if exist the typeService

        if(!typeService){
            return notFound(res,'The type-service id not found');
        }

        await TypeService.findByIdAndDelete(id); //Find and delete

        okRequest(res,'TypeService was deleted')
    }catch(error){
        console.log(error)
    }
}