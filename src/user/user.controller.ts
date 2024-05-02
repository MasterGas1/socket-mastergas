import { Request, Response } from 'express';
import validateRouteBody from '../helper/validateRoute';
import { okRequest, badRequest, internalServerError, handleErrorResponse } from '../helper/handleResponse';
import parseMongoId from '../helper/parseMongoId';
import { getAllUsers, getOneUser, createUser, auth, addUserAddress } from './user.service';

export const postUser = async (req: Request, res: Response) => {

    const response = validateRouteBody(req, res);

    if (response)
        return response

    const { body } = req

    try {

        const user = await createUser(body, res)

        okRequest(res, user) //Return user object

    } catch (error) {
        console.log(error);
        return internalServerError(res) //Return server error
    }
}

export const authUser = async (req: Request, res: Response) => {

    if (validateRouteBody(req, res))
        return;

    try {

        const { user, token, role } = await auth(req.body, res)

        okRequest(res, { name: user.name, lastName: user.lastName, token: token, role: role?.name })
    } catch (error: any) {

        return handleErrorResponse(res, error.message);
    }
}

export const getUsers = async (req: Request, res: Response) => {
    try {

        const users = await getAllUsers(); //Find all the type-services

        okRequest(res, users) //Return typeService object

    } catch (error) {
        console.log(error)

        return internalServerError(res) // Return server error
    }
}

export const getByIdUser = async (req: Request, res: Response) => {
    const { id } = req.params

    try {
        if (!parseMongoId(id))
            return badRequest(res, 'The id is not uuid');

        const user = await getOneUser(id);

        okRequest(res, user)
    } catch (error) {
        console.log(error)

        return internalServerError(res)
    }
}

export const createAndAddAddress = async (req: Request, res: Response) => {

    try {
        const user = await addUserAddress(req, res)

        okRequest(res, user)
    } catch (error) {
        if (error instanceof Error) {
            return badRequest(res, error.message);
        }
        return internalServerError(res);
    }
}