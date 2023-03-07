import { Request, Response } from 'express';

import User from './user.model';

import validateRouteBody from '../helper/validateRoute';
import { okRequest, badRequest, internalServerError, notFound } from '../helper/handleResponse';

export const createUser = async(req: Request, res: Response) => {

    const response = validateRouteBody(req,res);

    if(response) 
        return response

    const {body} = req

    try{
        
        const isRepeated = await User.findOne({name: body.name}); // Find if the name is already exist

        if (isRepeated){
            return badRequest(res, 'The user is already registered') // Return bad request
        }

        const user = new User(body); //Create the object

        await user.save(); //Save the object

        okRequest(res,user) //Return user object

    }catch(error){
        console.log(error);
        return internalServerError(res) //Return server error
    }
}

export const getUsers = async (req: Request, res: Response) => {
    try{

        const users = await User.find(); //Find all the type-services
    
        okRequest(res,users) //Return typeService object

    }catch(error){
        console.log(error)

        return internalServerError(res) // Return server error
    }
}