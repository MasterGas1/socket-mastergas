import {Router} from 'express'

import { createTypeService, getAllTypeServices, getByIdTypeServices, updateTypeService, deleteTypeService } from './type-service.controller';

import { validationCreate, validationUpdate } from './type-service.validator';


const router = Router();

router.post('/',
    validationCreate,
    createTypeService
);

router.get('/',getAllTypeServices)

router.get('/:id', getByIdTypeServices)

router.put('/:id',
    validationUpdate,
    updateTypeService
)

router.delete('/:id',deleteTypeService)

export default router;