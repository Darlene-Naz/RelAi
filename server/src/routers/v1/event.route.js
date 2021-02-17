import { Router } from 'express';
import { checkEventFunction } from '../../controllers/v1/event.controller';

const eventRouter = Router()

eventRouter.route('/check').post(checkEventFunction);

export default eventRouter;