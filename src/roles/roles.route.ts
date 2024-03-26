import { Router } from 'express'
import { default as validationMiddleware } from '../middleware/validation.middleware';
import {
    postRole,
    getRole,
    putRole,
    deleteRole,
    getRoles
} from './role.controller';
import { validationRoleCreate } from './role.validator';

const router = Router();

router.post(
    '/',
    validationRoleCreate,
    validationMiddleware,
    postRole
);

router.get('/', getRoles);

router.get('/:id', getRole);

router.put('/:id', putRole);

router.delete('/:id', deleteRole);

export default router;