import { Router } from 'express';
import { getAnalyzedOutput, getEventsFromText } from '../../controllers/v1/text.controller';

const textRouter = Router()

textRouter.route('/analyze').post(getAnalyzedOutput);
textRouter.route('/events').post(getEventsFromText);

export default textRouter;