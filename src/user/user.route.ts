import {Router} from 'express'

import { createUser, getByIdUser, getUsers } from './user.controller'
import { createCustomer } from '../customer/customer.controller';

import { validationCreate } from './user.validator';
import { validationCustomerCreate } from '../customer/customer.validator';


 const router = Router();

//Customer
router.post('/customer',
    validationCreate, //Validation user validation
    validationCustomerCreate, // validation customer
    createCustomer
)




 router.post('/', 
    validationCreate,
    createUser);

router.get('/', getUsers);

router.get('/:id', getByIdUser);

 export default router;