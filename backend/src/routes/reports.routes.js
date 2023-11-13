import { Router } from 'express';
import * as ReportsController from '../controllers/reports_controller.js';
const router = Router();

router.get('/productsUntilADate/:startDate/:endDate', ReportsController.productsUntilADate);
router.get('/soldProductsByCategory/:category', ReportsController.soldProductsByCategory);
router.get('/soldProductsByName/:name', ReportsController.soldProductsByName);
router.get('/soldProductsBySupplier/:supplierName', ReportsController.soldProductsBySupplier)
router.get('/salesAboveAverage', ReportsController.salesAboveAverage);
router.get('/overallSales', ReportsController.overallSales);
router.get('/unsuccessfulSales', ReportsController.unsuccessfulSales);
router.get('/getEmployees', ReportsController.getEmployees);

export { router as ReportsRoutes }