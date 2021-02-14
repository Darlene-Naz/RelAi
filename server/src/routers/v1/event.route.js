import { Router } from 'express';
import { getEventsFromText, returnEvents } from '../../controllers/v1/event.controller';

const eventRouter = Router()

eventRouter.route('/create-event').post(getEventsFromText);
eventRouter.route('/get-events').post(returnEvents);

export default eventRouter;