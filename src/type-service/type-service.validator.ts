import {check} from 'express-validator'

export const validationCreate = [
    check('name','The name is required in type-service').not().isEmpty(),
    check('name','The name needs to be string in type-service').isString()
]

export const validationUpdate = [
    check('name','The name is required in type-service').optional().not().isEmpty(),
    check('name','The name needs to be string in type-service').optional().isString()
]