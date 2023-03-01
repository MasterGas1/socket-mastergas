import {check} from 'express-validator'

export const validationCreate = [
    check('rfc', 'The rfc is required in customers').not().isEmpty(),
    check('taxResidence','The taxResidence is require in customers').not().isEmpty()
]

export const validationUpdate = [
    check('rfc', 'The rfc needs to be string in customer').optional().isString(),
    check('taxResidence', 'The taxResidence needs to be string in customer').optional().isString()
]