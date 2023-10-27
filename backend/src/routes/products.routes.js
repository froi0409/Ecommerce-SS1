import { Router } from 'express';
import * as ProductsController from '../controllers/productsController.js';
import * as LoginController from '../controllers/loginController.js';

const router = Router();

router.get('/getAllProducts', ProductsController.getAllProducts);
router.get('/getProduct/:id', ProductsController.getProductById);
router.get('/getProductsByCategory/:category', ProductsController.getProductsByCategory);

router.get('/getCategories', ProductsController.getCategories);

router.post('/login', LoginController.login);

export { router as ProductsRoutes }
