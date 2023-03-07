import {Router} from 'express'

import { createUser, getUsers } from './user.controller'
import { validationCreate } from './user.validator';


 const router = Router();

 router.post('/', 
    validationCreate,
    createUser);

router.get('/', getUsers);

 export default router;