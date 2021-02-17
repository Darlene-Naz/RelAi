import { Router } from 'express';
import authRouter from './auth.route';
import textRouter from './text.route';
import convertRouter from './convert.route';
import eventRouter from './event.route';

const router = Router();

router.use('/auth', authRouter);
router.use('/text', textRouter);
router.use('/convert', convertRouter);
router.use('/event', eventRouter);

export default router;