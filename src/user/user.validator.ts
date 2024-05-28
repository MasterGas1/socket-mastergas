import {check} from 'express-validator'

export const validationUserCreate = [
    check('name','The name requires 4 characters minimum').isLength({min:4}),
    check('name','The name needs to be string user').isString(),
    check('lastName','The last name requires 4 characters minimum').isLength({min:4}),
    check('lastName', 'The last name needs to be string user').isString(),
    check('email','The email is necessary').isEmail(),
    check('password','The passwords requires 8 characters minimum').isLength({min:8}),
    check('password','The password needs to be string').isString(),
    check('rfc', 'The rfc is required in customers').not().isEmpty(),
    check('rfc','The rfc should have 12 character min and 13 max').isLength({min: 12, max:13}),
    check('taxResidence','The taxResidence is require in customers').not().isEmpty(),
    check('taxResidence', 'The taxResidence should be a string').isString()
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
    check('newPassword', 'The new password needs to be string').optional().isString(),
    check('rfc', 'The rfc is required in customers').optional().not().isEmpty(),
    check('rfc','The rfc should have 12 character min and 13 max').optional().isLength({min: 12, max:13}),
    check('taxResidence','The taxResidence is require in customers').optional().not().isEmpty(),
    check('taxResidence', 'The taxResidence should be a string').optional().isString()
]

export const validationAuthUser = [
    check('email','The email is necessary').isEmail(),
    check('password','The passwords requires 8 characters minimum').isLength({min:8}),
    check('password','The password needs to be string').isString()
]

export const validationUserInstallerCreate = [
    check('name','name is required in user')
        .not().isEmpty(),
    check('lastName','lastName is required in user')
        .not().isEmpty(),
    check('email','email is required and should be a email in user')
        .not().isEmpty().isEmail(),
    check('rfc', 'The rfc is required in user')
        .not().isEmpty().isLength({min: 12, max:13}),
]
