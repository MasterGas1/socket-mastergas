import { Request, Response } from 'express';
import { validationResult } from 'express-validator';

import User from '../user/user.model'

import { badRequest, okRequest } from '../helper/handleResponse';
import messages from '../helper/messages';

export const validateEmail = async (req:Request, res:Response) => {
    const error = validationResult(req);
    if(!error.isEmpty()){
        return badRequest(res,error.array())
    }

    const user = await User.findOne({email: req.body.email})

    if(user){
        return badRequest(res, messages["messagesSp"].emailExist)
    }

    return okRequest(res, null)

}

