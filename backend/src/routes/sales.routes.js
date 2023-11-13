import { Router } from "express";
import * as SalesController from '../controllers/sales_controller.js';

const router = Router();

router.post('/makeSale', SalesController.makeSale);

export { router as SalesRoutes }
