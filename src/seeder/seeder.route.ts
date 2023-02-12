import { Router } from "express";
import { createTypeService } from './seeder.controller';

const router = Router();

router.get('/type-service', createTypeService)

export default router;