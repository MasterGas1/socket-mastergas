import { Router } from "express";
import { createCustomer, deleteCustomer, getCustomerByToken, updateCustomer } from "./customer.controller";
import {validationCustomerCreate, validationCustomerUpdate} from './customer.validator'
import authMiddleware from "../user/user.middleware";


const router = Router();

router.post('/', validationCustomerCreate, createCustomer);

//router.get('/', getAllCustomers);

router.get('/', 
    authMiddleware,
    getCustomerByToken    
);

router.put('/:id', validationCustomerUpdate, updateCustomer);

router.delete('/:id', deleteCustomer);

export default router;