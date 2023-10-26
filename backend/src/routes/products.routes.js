import { Router } from 'express';
import * as ProductsController from '../controllers/productsController.js';

const router = Router();

router.get('/getAllProducts', ProductsController.getAllProducts);
router.get('/getProduct/:id', ProductsController.getProductById);
router.get('/getProductsByCategory/:category', ProductsController.getProductsByCategory);

router.get('/getCategories', ProductsController.getCategories);

export { router as ProductsRoutes }
