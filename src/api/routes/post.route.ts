import { Router } from 'express';

import * as postController from '../controller/post.controller';
import MessageResponse from '../../interfaces/MessageResponse';
import { authenticateAccessToken } from '../../auth/auth.middlewares';

const router = Router();

// Create route
router.post<{}, MessageResponse>('/', authenticateAccessToken, postController.create);

// View all route
router.get<{}, MessageResponse>('/', authenticateAccessToken, postController.viewAll);

// View one route
router.get<{}, { id: number }, MessageResponse>('/:id', authenticateAccessToken, postController.viewOne);

// Update route
router.put<{}, { id: number }, MessageResponse>('/:id', authenticateAccessToken, postController.update);

// Delete route
router.delete<{}, { id: number }, MessageResponse>('/:id', authenticateAccessToken, postController.deleteOne);

export default router;