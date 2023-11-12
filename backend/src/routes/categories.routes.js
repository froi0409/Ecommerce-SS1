import { Router } from "express";
import * as CategoriesController from '../controllers/categories_controller.js';

const router = Router();

router.get('/getAllCategories', CategoriesController.getAllCategories);

router.post('/createCategory', CategoriesController.createCategory);

router.put('/updateCategory', CategoriesController.updateCategory);

export { router as CategoriesRoutes };