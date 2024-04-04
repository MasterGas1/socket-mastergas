import { Response } from "express";

interface ResponseProps{
    status: number,
    data?: String | Object[] | Object | null
}

let response:ResponseProps = {
    status:0
};

export const handleErrorResponse = (res: Response, data: string) : Response => {
   try {
       const [status, message] = data.split('-');
   
       return res.status(Number(status)).json({
           message
       })
   }catch (error){
        console.log(error)
        return res.status(500).json({
            message: 'Cant execute request - Check server logs'
        })
   }
}

export const okRequest = ( res: Response, data?: String | Object[] | Object | null | unknown) : Response => {
    return res.json(data);
}

export const badRequest = (res: Response ,data: string | object[]): Response => {
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

export const unauthorized = (res: Response, data: string | object): Response => {
    response = {
        status: 401,
        data
    }
    
    return res.status(401).send(response)
}

export const preconditionRequiredRequest = (res:Response,data:Object) => {
    response = {
        status: 428,
        data
    }
    
    return res.status(428).json(response)
}

export const internalServerError = (res: Response): Response => {
    response = {
        status: 500,
        data: 'Cant execute request - Check server logs' 
    }

    return res.status(500).send(response)
}
