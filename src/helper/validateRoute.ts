import { Request, Response} from "express";
import {validationResult} from 'express-validator'

const validateRouteBody = (req: Request, res: Response) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.json({errors:errors.array()})
    } 
}

export default validateRouteBody;