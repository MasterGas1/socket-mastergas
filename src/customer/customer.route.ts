import { Router } from "express";
import { createCustomer, deleteCustomer, getAllCustomers, getByIdCustomers, updateCustomer } from "./customer.controller";
import {validationCreate, validationUpdate} from './customer.validator'


const router = Router();

router.post('/', validationCreate, createCustomer);

router.get('/', getAllCustomers);

router.get('/:id', getByIdCustomers);

router.put('/:id', validationUpdate, updateCustomer);

router.delete('/:id', deleteCustomer);

export default router;