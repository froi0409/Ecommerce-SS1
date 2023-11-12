import { Router } from 'express';
import * as UsersController from '../controllers/users_controller.js';
import * as LoginController from '../controllers/login_controller.js';

const router = Router();

router.get('/getAllUsers', UsersController.getAllUsers);
router.get('/getUserByUsername/:username', UsersController.getUserByUsername);

router.post('/login', LoginController.login);
router.post('/createUser', UsersController.createUser);

router.put('/updateUser', UsersController.updateUser);
router.put('/updatePassword', UsersController.updatePassword);



export { router as UsersRoutes }