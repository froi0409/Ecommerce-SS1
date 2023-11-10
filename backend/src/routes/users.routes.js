import { Router } from 'express';
import * as UsersController from '../controllers/users_controller.js';
import * as LoginController from '../controllers/login_controller.js';

const router = Router();

router.post('/login', LoginController.login);

router.post('/insertUser', UsersController.getAllUsers);


export { router as UsersRoutes }