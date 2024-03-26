import { Router } from 'express';

import { default as validationMiddleware } from '../middleware/validation.middleware';
import authMiddleware from '../user/user.middleware';
import { validationUserCreate } from '../user/user.validator';
import {
  deleteInstaller,
  getInstaller,
  getInstallers,
  postInstaller,
  putInstaller,
} from './installer.controller';
import { validationInstallerCreate } from './installer.validator';

const router = Router();

// Installer
router.post(
  '/',
  validationUserCreate, //Validation user validation
  validationInstallerCreate,
  validationMiddleware,
  postInstaller
);

router.get('/', authMiddleware, getInstaller);

router.get('/all', authMiddleware, getInstallers);

router.put('/', authMiddleware, putInstaller);

router.delete('/', authMiddleware, deleteInstaller);

export default router;
