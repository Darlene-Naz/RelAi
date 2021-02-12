import { Router } from 'express';
import { getAuthLink, getAuthToken } from '../../controllers/v1/auth.controller';

const authRouter = Router()

authRouter.route('/get-auth-link').get(getAuthLink);
authRouter.route('/get-auth-token').post(getAuthToken);

export default authRouter;