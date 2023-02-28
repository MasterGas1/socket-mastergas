import {check} from 'express-validator'

export const validationCreate = [
    check('rfc', 'The rfc is required in customers').not().isEmpty(),
    check('taxResidence','The taxResidence is require in customers').not().isEmpty()
]