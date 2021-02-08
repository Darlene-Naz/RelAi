import { Router } from 'express';
import textRouter from './text.route';
import convertRouter from './convert.route';

const router = Router();

router.use('/text', textRouter);
router.use('/convert', convertRouter);

export default router;