import { Router } from "express";
import { createService, deleteService, getOneService, getRootServices, updateService } from './service.controller';
import { validationCreate, validationUpdate } from './service.validator';

const router = Router();

router.post('/', 
    validationCreate,
    createService
    )
    

router.get('/',getRootServices)

router.get('/:id',getOneService)

router.put('/:id',
    validationUpdate,
    updateService
)

router.delete('/:id',
    deleteService
)

export default router;