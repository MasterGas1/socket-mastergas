import { Request, Response } from "express";

import { internalServerError, okRequest } from "../helper/handleResponse";

import TypeService from "../type-service/type-service.model";
import Roles from "../roles/roles.model";

import { dataTypeService } from './data/dataTypeService';
import { dataRoles } from "./data/dataRoles";

export const createTypeService = async(req: Request,res: Response) => {
    try{

        await TypeService.deleteMany(); //Delete all types services

        await TypeService.insertMany(dataTypeService) //Insert new ones

        okRequest(res,'Seeder type-service was executed')
    }catch(error){
        console.log(error)
        return internalServerError(res) // Return server error
    }
}

export const createRoles = async(req: Request, res: Response) => {
    try{

        await Roles.deleteMany();

        await Roles.insertMany(dataRoles)
        okRequest(res,'Seeder roles was executed')
    }catch(error){
        console.log(error)
        return internalServerError(res) // Return server error
    }
}