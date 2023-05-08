import { Router } from "express";
import { createCustomer, deleteCustomer, getAllCustomers, getByIdCustomers, updateCustomer } from "./customer.controller";
import {validationCustomerCreate, validationCustomerUpdate} from './customer.validator'


const router = Router();

router.post('/', validationCustomerCreate, createCustomer);

router.get('/', getAllCustomers);

router.get('/:id', getByIdCustomers);

router.put('/:id', validationCustomerUpdate, updateCustomer);

router.delete('/:id', deleteCustomer);

export default router;