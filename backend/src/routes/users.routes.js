import { Router } from 'express';
import * as UsersController from '../controllers/users_controller.js';
import * as LoginController from '../controllers/login_controller.js';

const router = Router();

router.get('/getAllUsers', UsersController.getAllUsers);
router.get('/getUserByUsername/:username', UsersController.getUserByUsername);
router.get('/getAddressesByUsername/:username', UsersController.getAddressByUsername);
router.get('/getPaymentPortalAccountsByUsername/:username', UsersController.getPaymentPortalAccountsByUsername);
router.get('/getPurchasesByUsername/:username', UsersController.getPurchaesByUsername);

router.post('/login', LoginController.login);
router.post('/createUser', UsersController.createUser);
router.post('/addAddress', UsersController.addAddress);
router.post('/addPaymentPortalAccount', UsersController.addPaymentPortalAccount);

router.put('/updateUser', UsersController.updateUser);
router.put('/updatePassword', UsersController.updatePassword);


export { router as UsersRoutes }