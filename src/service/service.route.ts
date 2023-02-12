import { Router } from "express";
import { createService } from "./service.controller";

const router = Router();

router.post('/', createService)

export default router;