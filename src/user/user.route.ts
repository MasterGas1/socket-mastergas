import { Router } from 'express'

import { authUser, postUser, getByIdUser, getUsers, addAddress } from './user.controller'
import { createCustomer, getCustomerByToken, updateCustomerByToken, deleteByTokenCustomer } from '../customer/customer.controller';

import { validationUserCreate, validationUserUpdate ,validationAuthUser } from './user.validator';
import authMiddleware from './user.middleware';


const router = Router();

//Customer
router.post('/customer',
    validationUserCreate, //Validation user validation
    createCustomer
)
router.get('/customer', 
    authMiddleware,
    getCustomerByToken)

router.put('/customer',
    authMiddleware,
    validationUserUpdate,
    updateCustomerByToken
)

router.delete('/customer',
    authMiddleware,
    deleteByTokenCustomer
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

router. post('/add-address/:id', addAddress);

export default router;