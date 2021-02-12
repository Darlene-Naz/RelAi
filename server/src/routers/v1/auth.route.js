import { Router } from 'express';
import { getAuthLink, returnAuthCode, getAuthToken } from '../../controllers/v1/auth.controller';

const authRouter = Router()

authRouter.route('/get-auth-link').get(getAuthLink);
authRouter.route('/oAuth2callback').get(returnAuthCode);
authRouter.route('/get-auth-token').post(getAuthToken);

export default authRouter;