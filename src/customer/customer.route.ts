import { Router } from "express";
import { createCustomer, deleteCustomer, getCustomerByToken, updateCustomerByToken } from "./customer.controller";
import { validationCustomerCreate, validationCustomerUpdate } from './customer.validator';
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
    validationCustomerUpdate,
    validationCustomerUpdate, 
    updateCustomerByToken);

router.delete('/', 
    authMiddleware,
    deleteCustomer
);

export default router;