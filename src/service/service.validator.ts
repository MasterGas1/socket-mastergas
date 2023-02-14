import { check } from "express-validator";

export const validationCreate = [
    check('name','The name is necessary').not().isEmpty(),
    check('name','The name is a string').isString(),
    check('description','The description is necessary').not().isEmpty(),
    check('description','The description is a string').isString(),
    check('image','The image is a string').optional().isString(),
    check('type','The type is necessary').not().isEmpty(),
    check('type','The type is a string').isString(), //validate enum
    check('father_service','The father_service is mongoId').optional().isMongoId(),
    check('sub_services','The sub_services is mongoId').optional().isMongoId(),
    check('price','The price is a number').optional().isNumeric()
]