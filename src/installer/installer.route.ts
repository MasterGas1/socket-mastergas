import { Router } from 'express';

import { default as validationMiddleware } from '../middleware/validation.middleware';
import authMiddleware from '../user/user.middleware';
import { validationUserInstallerCreate } from '../user/user.validator';
import {
  deleteInstaller,
  getInstallerById,
  getInstallers,
  postInstaller,
  //putInstaller,
} from './installer.controller';
import { validationInstallerCreate } from './installer.validator';
import validateIdMiddleware from '../middleware/validateId.middleware';

const router = Router();

// Installer
router.post(
  '/',
  validationUserInstallerCreate, //Validation user validation
  validationInstallerCreate,
  validationMiddleware,
  postInstaller
);

router.get('/:id',
  getInstallerById);

router.get('/', getInstallers);

//router.put('/', authMiddleware, putInstaller);

router.delete('/:id', validateIdMiddleware, deleteInstaller);

export default router;
