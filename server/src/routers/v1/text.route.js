import { Router } from 'express';
import { getSummarizedOutput, getEventsFromText } from '../../controllers/v1/text.controller';

const textRouter = Router()

textRouter.route('/summarize').post(getSummarizedOutput);
textRouter.route('/events').post(getEventsFromText);

export default textRouter;