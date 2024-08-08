import express from 'express';
import validateBody from '../helpers/validateBody.js';
import authenticate from '../helpers/authenticate.js';

import authControllers from '../controllers/authControllers.js';
import { sighUpSchema, updateSubscriptionSchema } from '../schemas/authSchemas.js';

const authRouter = express.Router();

authRouter.post('/register', validateBody(sighUpSchema), authControllers.sighUp);

authRouter.post('/login', authControllers.sighIn);

authRouter.post('/logout', authenticate, authControllers.logout);

authRouter.get('/current', authenticate, authControllers.myProfile);

authRouter.patch('/subscription', authenticate, validateBody(updateSubscriptionSchema), authControllers.changeSubscription);

export default authRouter;
