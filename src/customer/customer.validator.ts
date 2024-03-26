import {check} from 'express-validator'

export const validationCustomerCreate = [
    check('customer.rfc', 'The rfc is required in customers').not().isEmpty(),
    check('customer.rfc','The rfc should have 12 character min and 13 max').isLength({min: 12, max:13}),
    check('customer.taxResidence','The taxResidence is require in customers').not().isEmpty(),
    check('customer.taxResidence', 'The taxResidence should be a string').isString()
]

export const validationCustomerUpdate = [
    check('customer.rfc', 'The rfc needs to be string in customer').optional().isString(),
    check('customer.taxResidence', 'The taxResidence needs to be string in customer').optional().isString()
]