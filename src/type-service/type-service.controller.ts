import { Request, Response } from 'express';

import TypeService from './type-service.model';

import validateRouteBody from '../helper/validateRoute';

export const createTypeService = async (req: Request, res:Response) => {

    validateRouteBody(req,res); //Validate body of request
    
    const {body} = req

    try{

        const isRepeated = await TypeService.find({name: body.name});

        if(isRepeated){
            return res.json('Repeated')
        }

        const typeService = new TypeService(body);

        await typeService.save();

        res.json(typeService)

    }catch(error){
        console.log(error);
    }
}

export const getAllTypeServices = async (req: Request, res: Response) => {
    try{

        const typeServices = await TypeService.find();
    
        res.json(typeServices)
    }catch(error){
        console.log(error)
    }
}

export const getByIdTypeServices = async (req: Request, res: Response) => {
    const {id} = req.params

    try{

        const typeService = await TypeService.findById(id)

        res.json(typeService)

    }catch(error){
        console.log(error)
    }
}

export const updateTypeService = async (req: Request, res: Response) => {

    const {id} = req.params

    const {body} = req

    try{
        const typeService = await TypeService.findByIdAndUpdate(id,body,{new: true})

        res.json(typeService)
    }catch(error){
        console.log(error)
    }
}

export const deleteTypeService = async (req: Request, res: Response) => {
    const {id} = req.params;

    try{

        await TypeService.findByIdAndDelete(id);

        res.json({})
    }catch(error){
        console.log(error)
    }
}