import { Router } from "express";
import { createCustomer, getAllCustomers } from "./customer.controller";
import {validationCreate} from './customer.validator'


const router = Router();

router.post('/', validationCreate, createCustomer);

router.get('/', getAllCustomers);

export default router;