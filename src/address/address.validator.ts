import {check} from 'express-validator'

export const validationCreate = [
    check('name','The name is required in address').not().isEmpty(),
    check('name', 'The name needs to be string in address').isString(),
    check('addressName','The addressName is required in address').not().isEmpty(),
    check('addressName','The addressName needs to be string in address').isString(),
    check('coords.latitude','The latitude is required in address').not().isEmpty(),
    check('coords.longitude','The longitude is required in address').not().isEmpty()
]

export const validationUpdate = [
    check('name', 'The name needs to be string in address').optional().isString(),
    check('addressName', 'The addressName needs to be string in address').optional().isString(),
    check('coords.latitude', 'The latitude needs to be number in address').optional().isFloat(),
    check('coords.longitude', 'The longitude needs to be number in address').optional().isFloat()
]