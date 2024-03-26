import { Request, Response} from "express";
import {validationResult} from 'express-validator'
import { badRequest } from "./handleResponse";

const validateRouteBody = (req: Request, res: Response) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return badRequest(res,errors.array())
    } 
}

export default validateRouteBody; 