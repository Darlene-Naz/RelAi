import { Router } from 'express';
import textRouter from './text.route';

const router = Router();

router.use('/text', textRouter);

export default router;