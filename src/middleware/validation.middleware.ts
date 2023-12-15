import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { badRequest } from '../helper/handleResponse';

const validationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return badRequest(res, errors.array());
  }
  next();
};

export default validationMiddleware;
