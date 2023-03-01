import { Router } from "express";
import { createCustomer, getAllCustomers, getByIdCustomers } from "./customer.controller";
import {validationCreate} from './customer.validator'


const router = Router();

router.post('/', validationCreate, createCustomer);

router.get('/', getAllCustomers);

router.get('/:id', getByIdCustomers);

export default router;