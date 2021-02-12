import { Router } from 'express';
import authRouter from './auth.route';
import textRouter from './text.route';
import convertRouter from './convert.route';

const router = Router();

router.use('/auth', authRouter);
router.use('/text', textRouter);
router.use('/convert', convertRouter);

export default router;