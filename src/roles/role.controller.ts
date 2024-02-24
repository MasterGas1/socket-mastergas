import { Request, Response } from 'express';
import {
    badRequest,
    internalServerError,
    okRequest
} from '../helper/handleResponse';
import {
    createRole,
    destroyRole,
    getAllRoles,
    getOneRole,
    updateRole
} from './roles.service';
import parseMongoId from '../helper/parseMongoId';

export const postRole = async (req: Request, res: Response) => {
    try {
        const response = await createRole(req.body);

        if (!response) {
            return badRequest(res, 'ERROR!!!');
        }
        return okRequest(res, response);
    } catch (error) {
        console.log(error);
        return internalServerError(res);
    }
};

export const getRole = async (req: Request, res: Response) => {
    try {

        const { id } = req.params;

        if (!parseMongoId(id)) {
            return badRequest(res, 'The id is not uuid');
        }

        const response = await getOneRole(id);
        return okRequest(res, response);
    } catch (error) {
        console.log(error);
        return internalServerError(res);
    }
}

export const getRoles = async (req: Request, res: Response) => {
    try {
        const response = await getAllRoles();

        return okRequest(res, response);
    } catch (error) {
        if (error instanceof Error) {
            return badRequest(res, error.message);
        }
        return internalServerError(res);
    }
}

export const putRole = async (req: Request, res: Response) => {
    try {

        const response = await updateRole(req)

        return okRequest(res, response);
    } catch (error) {
        if (error instanceof Error) {
            return badRequest(res, error.message);
        }
        return internalServerError(res);
    }
}

export const deleteRole = async (req: Request, res: Response) => {
    try {

        const response = await destroyRole(req);

        return okRequest(res, response);
    } catch (error) {
        if (error instanceof Error) {
            return badRequest(res, error.message);
        }
        return internalServerError(res);
    }
}