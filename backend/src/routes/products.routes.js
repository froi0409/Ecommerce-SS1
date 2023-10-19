import { Router } from 'express';
import * as ProductsController from '../controllers/productsController.js';

const router = Router();

router.get('/getAllProducts', ProductsController.getAllProducts);

export { router as ProductsRoutes }
