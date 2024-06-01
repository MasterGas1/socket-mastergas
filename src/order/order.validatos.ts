import { check } from "express-validator";

export const validationCreate = [
    check('serviceId', 'The serviceId is necessary').not().isEmpty(),
    check('serviceId', 'The serviceId is mongoId').isMongoId(),
    check('installerUserId', 'The installerUserId is necessary').not().isEmpty(),
    check('installerUserId', 'The installerUserId is mongoId').isMongoId(),
    check('customerUserId', 'The customerUserId is necessary').not().isEmpty(),
    check('customerUserId', 'The customerUserId is mongoId').isMongoId(),
    check('price', 'The price is necessary').not().isEmpty(),
    check('price', 'The price is number').isNumeric(),
]