import { Request, Response } from "express";

import Service from './service.model';

import { badRequest, internalServerError, notFound, okRequest } from '../helper/handleResponse';
import { serviceProps } from "../interfaces/service.interface";
import validateRouteBody from '../helper/validateRoute';
import parseMongoId from "../helper/parseMongoId";

declare module "express"{
    interface Request{
        body: any
    }
}

export const createService = async (req: Request,res: Response) => {

    const response = validateRouteBody(req,res)
        
    if(response)
        return response

    try{
        
        const {body} = req;

        //change name and description to lowercase

        if((body.type === 'subservice' || body.type === 'price' ) && !body.father_service) // Validate if this types have fatherId
         {
            return badRequest(res, `${body.type} needs father_service`)
         }
        else if(body.type !== 'root service'){ //Call rootFather function if the type isnt root service
            return rootFather(body,res)
        } else if(body.father_service){
            return badRequest(res,'The root service cannot have a father_service')
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


export const getRootServices = async(req: Request, res: Response) => {
    try{
        const services = await Service.find({type: 'root service'}).populate('sub_services', '-father_service')

        okRequest(res,services)
    }catch(error){
        console.log(error)
        return internalServerError(res) // Return server error
    }
}

export const getOneService = async(req: Request, res: Response) => {
    try{

        const {id} = req.params;
        
        if(!parseMongoId(id)) //Checks if the id is a uuid
            return badRequest(res,'The id is not uuid');


        const service = await Service.findById(id).populate('sub_services', '-father_service');

        if(!service)
            return notFound(res,'The not found')

        okRequest(res,service)

    }catch(error){
        console.log(error);
        return internalServerError(res); //Return server error
    }
}

export const updateService = async(req:Request,res:Response) => {
    try{
        const {id} = req.params;
        const {name, father_service, available} = req.body
        
        if(!parseMongoId(id)) //Checks if the id is a uuid
            return badRequest(res,'The id is not uuid');
        
        let service:any = await Service.findById(id) // Find if exist the service

        if(!service){
            return notFound(res,'The service id not found');
        }

        if(father_service && service.type === 'root service'){ //Checks if the father root has a father_service
            return badRequest(res,'The root service cannot have a father_service')
        }else if(!father_service && service.type !== 'root service'){ //Checks if any others types has a father_service
            return badRequest(res,'Any differente root service needs a father_service');
        }

        service = await Service.findOne({father_service, name}); // Checks if the service name is not repeated at the same father

        if(service){
           return badRequest(res,'The service name is allready exist');
        }

        const newService = { // At the moment only can change the name
            name,
            available
        }

        service = await Service.findByIdAndUpdate(id,newService,{new: true}); //Update the service

        okRequest(res,service) //Return typeService object
    }catch(error){
        console.log(error);
        return internalServerError(res); //Return server error
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