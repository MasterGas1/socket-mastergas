import { Router } from 'express'

import { authUser, postUser, getByIdUser, getUsers } from './user.controller'
import { createCustomer } from '../customer/customer.controller';

import { validationUserCreate, validationAuthUser } from './user.validator';
import { validationCustomerCreate } from '../customer/customer.validator';


const router = Router();

//Customer
router.post('/customer',
    validationUserCreate, //Validation user validation
    validationCustomerCreate, // validation customer
    createCustomer
)


//User
router.post('/auth',
    validationAuthUser,
    authUser
)

router.post('/',
    validationUserCreate,
    postUser);

router.get('/', getUsers);

router.get('/:id', getByIdUser);

export default router;