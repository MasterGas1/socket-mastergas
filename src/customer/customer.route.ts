import { Router } from "express";
import { createCustomer } from "./customer.controller";
import {validationCreate} from './customer.validator'


const router = Router();

router.post('/', validationCreate, createCustomer);

export default router;