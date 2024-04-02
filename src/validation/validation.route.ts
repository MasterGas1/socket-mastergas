import { Router } from "express";
import {check} from 'express-validator'
import { validateEmail } from "./validation.controller";

const router = Router();

router.post('/email',
    check('email','The email is necessary').isEmail(),
    validateEmail
)

export default router;