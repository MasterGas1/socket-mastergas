import { Response } from "express";

interface ResponseProps{
    status: number,
    data?: String | Object[] | Object | null
}

let response:ResponseProps = {
    status:0
};

export const okRequest = ( res: Response, data?: String | Object[] | Object | null) : Response => {
    response = {
        status: 200,
        data
    }

    return res.json(response);
}

export const badRequest = (res: Response ,data: string): Response => {
    response = {
        status: 400,
        data 
    }

    return res.status(400).send(response)
}

export const notFound = (res: Response,data: string): Response =>{
    response = {
        status: 400,
        data
    }

    return res.status(404).send(response)
}

export const internalServerError = (res: Response): Response => {
    response = {
        status: 500,
        data: 'Cant execute request - Check server logs' 
    }

    return res.status(500).send(response)
}