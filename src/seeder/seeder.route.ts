import { Router } from "express";
import { createRoles, createTypeService } from './seeder.controller';

const router = Router();

router.get('/type-service', createTypeService)

router.get('/roles', createRoles);

export default router;