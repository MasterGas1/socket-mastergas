import { Request, Response } from "express";

import Service from './service.model';

import { badRequest, internalServerError, okRequest } from '../helper/handleResponse';
import { serviceProps } from "../interfaces/service.interface";

declare module "express"{
    interface Request{
        body: serviceProps
    }
}

export const createService = async (req: Request,res: Response) => {
        
    try{
        
        const {body} = req;

        if((body.type === 'subservice' || body.type === 'price' ) && !body.father_service) // Validate if this types have fatherId
         {
            return badRequest(res, `${body.type} needs father_service`)
         }
        else if(body.type !== 'root service'){ //Call rootFather function if the type isnt root service
            return rootFather(body,res)
        }

        const isRootServiceExist = await Service.findOne({name: body.name, type: body.type})

        if(isRootServiceExist){ //Validate if the name with type root service exist
            return badRequest(res, `The name ${body.name} with type root service is already exist`)
        }

        const service = new Service(body); //Create service

        await service.save(); //Save new service

        return okRequest(res,service) //Return service

    }catch(error){
        console.log(error)
        return internalServerError(res) // Return server error
    }
}




const rootFather = async(body: serviceProps,res: Response) => {
    const fatherExist = await Service.findById(body.father_service);
    
    if(!fatherExist) //Checks if the fatherId Exist
        return badRequest(res,'The father_service dont exist')

    if(fatherExist.type === 'price') //Validate if the father is type price
        return badRequest(res, 'The father cannot be type price')

    const isSubserviceExiste = await Service.findOne({name: body.name, type: body.type, father_service: body.father_service})

    if(isSubserviceExiste) //Checks if the name is already exist
        return badRequest(res,`The name ${body.name} with type root service is already exist`)
    
    try{
        
        const session = await Service.startSession(); 
    
        await session.withTransaction(async () => { //This helps if theres a error make a rollback
    
            const service = new Service(body); //Create service
    
            await service.save(); //Save new service
    
            const updatedService = await Service.updateOne(
                {_id: body.father_service},
                {$push: {sub_services: service._id}}
                )    
    
            return okRequest(res,{service,updatedService}) //Return service
        })    
    
        session.endSession();

    }catch(error){
        console.log(error)
        return internalServerError(res) // Return server error
    }

} 