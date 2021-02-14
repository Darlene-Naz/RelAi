import { Router } from 'express';
import { getAnalyzedOutput } from '../../controllers/v1/text.controller';

const textRouter = Router()

textRouter.route('/analyze').post(getAnalyzedOutput);

export default textRouter;