import {Router} from 'express'
import { createTypeService, getAllTypeServices, getByIdTypeServices, updateTypeService, deleteTypeService } from './type-service.controller';

const router = Router();

router.post('/', createTypeService);
router.get('/',getAllTypeServices)
router.get('/:id', getByIdTypeServices)
router.put('/:id',updateTypeService)
router.delete('/:id',deleteTypeService)

export default router;