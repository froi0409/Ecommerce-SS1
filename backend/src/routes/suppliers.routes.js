import { Router } from "express";
import * as SupplierController from '../controllers/supplier_controller.js';

const router = Router();

router.get('/getAllSuppliers', SupplierController.getAllSuppliers);

router.post('/insertSupplier', SupplierController.insertSupplier);

router.put('/updateSupplier', SupplierController.updateSupplier);

router.delete('/deleteSupplier', SupplierController.deleteSupplier);

export { router as SupplierRoutes }