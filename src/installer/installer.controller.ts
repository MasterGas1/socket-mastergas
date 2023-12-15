import { Request, Response } from 'express';
import {
  badRequest,
  internalServerError,
  okRequest,
} from '../helper/handleResponse';
import {
  createInstaller,
  destroyInstaller,
  getAllInstallers,
  getOneInstaller,
  updateInstaller,
} from './installer.service';

export const postInstaller = async (req: Request, res: Response) => {
  try {
    const response = await createInstaller(req.body);

    if (!response) {
      return badRequest(res, 'The token is already exist');
    }

    return okRequest(res, { token: response });
  } catch (error) {
    if (error instanceof Error) {
      return badRequest(res, error.message);
    }
    return internalServerError(res);
  }
};

export const getInstaller = async (req: Request, res: Response) => {
  try {
    const response = await getOneInstaller(req);

    return okRequest(res, response);
  } catch (error) {
    if (error instanceof Error) {
      return badRequest(res, error.message);
    }
    return internalServerError(res);
  }
};

export const getInstallers = async (req: Request, res: Response) => {
  try {
    const response = await getAllInstallers();
    return okRequest(res, response);
  } catch (error) {
    if (error instanceof Error) {
      return badRequest(res, error.message);
    }
    return internalServerError(res);
  }
};

export const putInstaller = async (req: Request, res: Response) => {
  try {
    // if (validateRouteBody(req, res)) return;

    const response = await updateInstaller(req);

    return okRequest(res, response);
  } catch (error) {
    if (error instanceof Error) {
      return badRequest(res, error.message);
    }
    return internalServerError(res);
  }
};

export const deleteInstaller = async (req: Request, res: Response) => {
  try {
    const response = await destroyInstaller(req);
    return okRequest(res, response);
  } catch (error) {
    if (error instanceof Error) {
      return badRequest(res, error.message);
    }
    return internalServerError(res);
  }
};
