import { Router } from "express";
import { createService, getRootServices } from "./service.controller";

const router = Router();

router.post('/', createService)
router.get('/',getRootServices)

export default router;