import { Router } from 'express';
import { getAnalyzedOutput, getEventsFromText, returnEvents } from '../../controllers/v1/text.controller';

const textRouter = Router()

textRouter.route('/analyze').post(getAnalyzedOutput);
textRouter.route('/create-event').post(getEventsFromText);
textRouter.route('/get-events').post(returnEvents);

export default textRouter;