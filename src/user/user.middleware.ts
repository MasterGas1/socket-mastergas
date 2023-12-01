import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { unauthorized } from '../helper/handleResponse';

export interface RequestMiddle extends Request {
    userId ?: string
}

const authMiddleware = (req: RequestMiddle,res:Response,next:NextFunction) => {
    const {authorization} = req.headers;

    try {
        if (!authorization) {
            return unauthorized(res,"It's necessary a token")
        }

        const token = authorization.replace('Bearer ', '')

        const secretKey = process.env.SECRET_KEY || "S3CR3TK3Y$"

        const encryption = jwt.verify(token, secretKey) as {id: string};

        req.userId = encryption.id;

        next();
    }catch(error) {
       unauthorized(res,{msg: 'Token no valid'});
    }
}

export default authMiddleware