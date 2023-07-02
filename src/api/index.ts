import express from 'express';

import MessageResponse from '../interfaces/MessageResponse';
import userRoute from './routes/user.route';
import postRoute from './routes/post.route';

const router = express.Router();

router.get<{}, MessageResponse>('/', (req, res) => {
  res.json({
    message: 'API - 👋🌍',
  });
});

router.use('/user', userRoute);
router.use('/post', postRoute);

export default router;