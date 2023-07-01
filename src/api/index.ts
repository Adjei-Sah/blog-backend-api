import express from 'express';

import MessageResponse from '../interfaces/MessageResponse';
import userRoute from './routes/user.route';

const router = express.Router();

router.get<{}, MessageResponse>('/', (req, res) => {
  res.json({
    message: 'API - 👋🌍',
  });
});

router.use('/user', userRoute);

export default router;