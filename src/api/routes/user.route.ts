import { Router } from 'express';

import * as userController from '../controller/user.controller';
import MessageResponse from '../../interfaces/MessageResponse';

const router = Router();

// Register Route
router.post<{}, MessageResponse>('/register', userController.register);

// Login Route
router.post<{}, MessageResponse>('/login', userController.login);

export default router;