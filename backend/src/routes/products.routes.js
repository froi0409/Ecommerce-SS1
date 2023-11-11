import { Router } from 'express';

import multer from 'multer';
import * as ProductsController from '../controllers/products_controller.js';

const router = Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


router.get('/getAllProducts', ProductsController.getAllProducts);
router.get('/getProduct/:id', ProductsController.getProductById);
router.get('/getEnabledProducts', ProductsController.getEnabledProducts);
router.get('/getProductsByCategory/:category', ProductsController.getProductsByCategory);


router.get('/getCategories', ProductsController.getCategories);

router.post('/insertProduct', upload.array('files', 7), ProductsController.insertProduct);

router.put('/updateProduct', ProductsController.updateProduct);
router.put('/disableProductById', ProductsController.disableProductById);

router.delete('/removeProduct', ProductsController.removeProduct);


export { router as ProductsRoutes }
