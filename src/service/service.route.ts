import { Router } from "express";
import { createService, getOneService, getRootServices } from "./service.controller";
import { validationCreate } from './service.validator';

const router = Router();

router.post('/', 
    validationCreate,
    createService)
    

router.get('/',getRootServices)

router.put('/:id',getOneService)

export default router;