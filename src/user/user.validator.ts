import {check} from 'express-validator'

export const validationUserCreate = [
    check('name','The name requires 4 characters minimum').isLength({min:4}),
    check('name','The name needs to be string user').isString(),
    check('lastName','The last name requires 4 characters minimum').isLength({min:4}),
    check('lastName', 'The last name needs to be string user').isString(),
    check('email','The email is necessary').isEmail(),
    check('password','The passwords requires 8 characters minimum').isLength({min:8}),
    check('password','The password needs to be string').isString()
]

export const validationUserUpdate = [
    check('name','The name requires 4 characters minimum').optional().isLength({min:4}),
    check('name','The name needs to be string user').optional().isString(),
    check('lastName','The last name requires 4 characters minimum').optional().isLength({min:4}),
    check('lastName', 'The last name needs to be string user').optional().isString(),
    check('email','The email is necessary').optional().isEmail(),
    check('password','The passwords requires 8 characters minimum').optional().isLength({min:8}),
    check('password','The password needs to be string').optional().isString(),
    check('newPassword','The new password requires 8 characters minimum').optional().isLength({min:8}),
    check('newPassword', 'The new password needs to be string').optional().isString()
]

export const validationAuthUser = [
    check('email','The email is necessary').isEmail(),
    check('password','The passwords requires 8 characters minimum').isLength({min:8}),
    check('password','The password needs to be string').isString()
]
