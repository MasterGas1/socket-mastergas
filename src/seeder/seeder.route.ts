import { Router } from "express";
import { createRoles, createTypeService, createAdmin  } from './seeder.controller';

const router = Router();

router.get('/type-service', createTypeService)
router.get('/roles', createRoles);
router.get('/admin', createAdmin);

export default router;