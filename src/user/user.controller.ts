import { Request, Response } from 'express';
import * as bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import User from './user.model';

import validateRouteBody from '../helper/validateRoute';
import { okRequest, badRequest, internalServerError, notFound, unauthorized } from '../helper/handleResponse';
import parseMongoId from '../helper/parseMongoId';

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

export const authUser = async(req: Request, res: Response) => {
    if(validateRouteBody(req,res))
        return;

    try{
        const {email, password} = req.body

        const user:any = await User.findOne({email}).select('_id email password')

        if(!user)
            return unauthorized(res,'Credentials are not valid (email)')
            
        if(!bcrypt.compareSync(password, user.password))
            return unauthorized(res,'Credentials are not valid (paswword)')

        const secretKey = process.env.SECRET_KEY || "S3CR3TK3Y$"

        const token = jwt.sign({id: user._id},secretKey)

        okRequest(res,{user,token: token})
    }catch(error){
        console.log(error)
        return internalServerError(res)
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

export const getByIdUser = async(req: Request, res: Response) => {
    const {id} = req.params

    try{
        if(!parseMongoId(id))
        return badRequest(res, 'The id is not uuid');

        const user = await User.findById(id)

        okRequest(res,user)
    }catch(error){
        console.log(error)

        return internalServerError(res)
    }
}