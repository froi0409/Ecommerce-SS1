import { Router } from 'express';
import * as ProductsController from '../controllers/productsController.js';

const router = Router();

router.get('/getAllProducts', ProductsController.getAllProducts);
router.get('/getProduct/:id', ProductsController.getProductById);

export { router as ProductsRoutes }
