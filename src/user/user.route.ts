import {Router} from 'express'

import { createUser, getByIdUser, getUsers } from './user.controller'
import { validationCreate } from './user.validator';


 const router = Router();

 router.post('/', 
    validationCreate,
    createUser);

router.get('/', getUsers);

router.get('/:id', getByIdUser);

 export default router;