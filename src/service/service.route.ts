import { Router } from "express";
import { createService, getRootServices } from "./service.controller";
import { validationCreate } from './service.validator';

const router = Router();

router.post('/', 
    validationCreate,
    createService)
    
router.get('/',getRootServices)

export default router;