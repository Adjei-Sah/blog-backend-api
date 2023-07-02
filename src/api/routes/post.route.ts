import { Router } from 'express';

import * as postController from '../controller/post.controller';
import MessageResponse from '../../interfaces/MessageResponse';
import { authenticateAccessToken } from '../../auth/auth.middlewares';

const router = Router();

// Create route
router.post<{}, MessageResponse>('/create', authenticateAccessToken, postController.create);

export default router;