import { Router } from 'express';
import * as UsersController from '../controllers/users_controller.js';


const router = Router();

router.post('/insertUser', UsersController.getAllUsers);

export { router as UsersRoutes }