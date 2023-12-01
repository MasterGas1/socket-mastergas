import { Router } from "express";
import { createCustomer, deleteByTokenCustomer, getCustomerByToken, updateCustomerByToken } from "./customer.controller";
import { validationCustomerCreate, validationCustomerUpdate } from './customer.validator';
import { validationUserUpdate } from "../user/user.validator";
import authMiddleware from "../user/user.middleware";


const router = Router();

router.post('/', validationCustomerCreate, createCustomer);

//router.get('/', getAllCustomers);

router.get('/', 
    authMiddleware,
    getCustomerByToken    
);

router.put('/',
    authMiddleware,
    validationUserUpdate,
    validationCustomerUpdate, 
    updateCustomerByToken);

router.delete('/', 
    authMiddleware,
    deleteByTokenCustomer
);

export default router;