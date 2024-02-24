import { check } from 'express-validator';

export const validationRoleCreate = [
    check('name', 'The name is required in role').not().isEmpty(),

    check(
        'permissions',
        'The permissions are required in role'
    )
        .isArray({ min: 1 })
]