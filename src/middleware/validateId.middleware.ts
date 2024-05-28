import { NextFunction, Request, Response } from 'express';
import { badRequest } from '../helper/handleResponse';
import { isValidObjectId } from 'mongoose';

const validateIdMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const {id} = req.params;
  
    if(!isValidObjectId(id)){
        return badRequest(res, 'The id is not uuid');
    }
    next();
  };

export default validateIdMiddleware