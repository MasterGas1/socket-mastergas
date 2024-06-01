import { Router } from "express";
import { postOrder, getOrders, getOrder } from "./order.controller";
import { validationCreate } from "./order.validatos";

const router = Router();

router.post('/',
    validationCreate,
    postOrder
)

router.get('/', getOrders)

router.get('/:id', getOrder)

export default router;