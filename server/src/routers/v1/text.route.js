import { Router } from 'express';
import { getSummarizedOutput } from '../../controllers/text.controller';

const textRouter = Router()

textRouter.route('/summarize').post(getSummarizedOutput);

export default textRouter;