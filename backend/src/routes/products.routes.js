import { Router } from 'express';
<<<<<<< HEAD
import * as ProductsController from '../controllers/productsController.js';
import * as LoginController from '../controllers/loginController.js';
=======
import multer from 'multer';
import * as ProductsController from '../controllers/products_controller.js';
>>>>>>> Init-Images

const router = Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


router.get('/getAllProducts', ProductsController.getAllProducts);
router.get('/getProduct/:id', ProductsController.getProductById);
router.get('/getProductsByCategory/:category', ProductsController.getProductsByCategory);

router.get('/getCategories', ProductsController.getCategories);

<<<<<<< HEAD
router.post('/login', LoginController.login);
=======

router.post('/addProduct', upload.array('files', 7), ProductsController.addProduct);
>>>>>>> Init-Images

export { router as ProductsRoutes }
