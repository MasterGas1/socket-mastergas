
import { Types } from 'mongoose';

import Service  from './service.model';

import { serviceInterface } from "../interfaces/service.interface";

import messages from "../helper/messages";


export const createServiceService = async (body: serviceInterface) => {
    const {type, fatherService} = body

    if((type === 'subservice' || type === 'price' ) && !fatherService) // Validate if these types have fatherId and check if is necessary to request it
    {
        throw new Error(`400-${body.type} needs fatherService`)
    }
    else if(type !== 'root service'){ //Call rootFather function if the type isnt root service
        try {
            return await rootFather(body)
        } catch (error:any) {
            throw new Error(error.message)
        }
    } else if(fatherService){ //Validate if the root service dont have a fatherService
        throw new Error('400-The root service cannot have a fatherService')
    }

    const isRootServiceExist = await Service.findOne({name: body.name, type: body.type})

    if(isRootServiceExist){ //Validate if the name with type root service exist
        throw new Error(messages["messagesSp"].serviceRepeated + body.name)
    }

    try {
        const service = new Service(body); //Create service
    
        await service.save(); //Save new service
    
        return service //Return service

    } catch (error) {
        console.log(error);
        throw new Error('500-Internal server error');
    }

}

export const getRootServicesService = async () => {
    return await Service.find({type: 'root service'}).select('-type -subServices -__v -deleted')
}

export const getOneServiceService = async (id: string) => {
    const service = await Service.findById(id).select('-type -__v ').populate('subServices', '-fatherService -subServices -type -__v');

    if(!service)
        throw new Error(messages["messagesSp"].serviceNotFound)

    return service;
}

export const updateServiceService = async (id: string, body: serviceInterface) => {
    const {name, fatherService, available} = body

    let service = await Service.findById<serviceInterface>(id) // Find if exist the service

    if(!service){
        throw new Error(messages["messagesSp"].serviceNotFound);
    }

    if(fatherService && service.type === 'root service'){ //Checks if the service finded is nos a root father
        throw new Error('400-The root service cannot have a father_service');
    }else if(!fatherService && service.type !== 'root service'){ //Checks if any others types has a father_service
        throw new Error('400-Any differente root service needs a father_service');
    }

    service = await Service.findOne({fatherService, name}); // Checks if the service name is not repeated at the same father

    if(service){
        throw new Error(messages["messagesSp"].serviceRepeated + name);
    }

    const newService = { // At the moment only can change the name
        name,
        available
    }

    return await Service.findByIdAndUpdate(id,newService,{new: true}).select('-type -subServices -__v -deleted'); //Update the service

}

export const deleteServiceService = async (id: string) => {
    let service = await Service.findById(id); // Find if exist the service

    if(!service){
        throw new Error(messages["messagesSp"].serviceNotFound);
    }

    for (let subservice of service.subServices) {
        deleteChildrens(subservice)
    }

    await service.delete();
}

const rootFather = async(body: serviceInterface) => {

    const {type, price} = body

    const fatherExist = await Service.findOne({_id: body.fatherService});
    
    if(!fatherExist) //Checks if the fatherId Exist
        throw new Error('400-The father service dont exist')

    if(fatherExist.type === 'price') //Validate if the father is type price
        throw new Error('400-The father cannot be type price')

    if (type === 'price' && !price) {
        throw new Error(`400-Type: ${body.type} needs price field`)
    }

    const isSubserviceExiste = await Service.findOne({name: body.name, type: body.type, father_service: body.fatherService})

    if(isSubserviceExiste) //Checks if the name is already exist
        throw new Error(messages["messagesSp"].serviceRepeated + body.name)
    
    try{
            
        const service = new Service(body); //Create service

        await service.save(); //Save new service

        await Service.findOneAndUpdate(
            {_id: body.fatherService},
            {$push: {subServices: service._id}}
        )
        
        const updatedService = await Service.findById(body.fatherService)
            
        
        return {service,updatedService} //Return service
        

    }catch(error){

        console.log(error)
        throw new Error('500-Internal server error') // Return server error
    }
}

const deleteChildrens = async(id: Types.ObjectId) => {

    const service = await Service.findById(id)

    if(!service){
        return
    }

    for (let subservice of service.subServices) {
        deleteChildrens(subservice)
    }

    await service.delete();
    
}