import {Router} from 'express'
import { createAddress, deleteAddress, getAllAddresses, getByIdAddress, updateAddress } from './address.controller';
import {validationCreate, validationUpdate} from './address.validator'

const router = Router();

router.post('/', validationCreate, createAddress);

router.get('/', getAllAddresses);

router.get('/:id', getByIdAddress);

router.put('/:id', validationUpdate, updateAddress);

router.delete('/:id', deleteAddress);

export default router;