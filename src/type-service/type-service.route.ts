import {Router} from 'express'
import {check} from 'express-validator'

import { createTypeService, getAllTypeServices, getByIdTypeServices, updateTypeService, deleteTypeService } from './type-service.controller';


const router = Router();

router.post('/',
    [
        check('name','The name is required in type-service').not().isEmpty(),
        check('name','The name needs to be string in type-service').isString()
            
    ],
    createTypeService
);

router.get('/',getAllTypeServices)

router.get('/:id', getByIdTypeServices)

router.put('/:id',updateTypeService)

router.delete('/:id',deleteTypeService)

export default router;