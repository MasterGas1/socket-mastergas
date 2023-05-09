import {check} from 'express-validator'

export const validationCustomerCreate = [
    check('customer.rfc', 'The rfc is required in customers').not().isEmpty(),
    check('customer.taxResidence','The taxResidence is require in customers').not().isEmpty()
]

export const validationCustomerUpdate = [
    check('customer.rfc', 'The rfc needs to be string in customer').optional().isString(),
    check('customer.taxResidence', 'The taxResidence needs to be string in customer').optional().isString()
]