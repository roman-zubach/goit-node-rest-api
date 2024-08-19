import express from 'express';
import validateBody from '../helpers/validateBody.js';
import authenticate from '../middlware/authenticate.js';
import upload from "../middlware/upload.js";

import authControllers from '../controllers/authControllers.js';
import { sighUpSchema, updateSubscriptionSchema } from '../schemas/authSchemas.js';

const authRouter = express.Router();

authRouter.post('/register', validateBody(sighUpSchema), authControllers.sighUp);

authRouter.post('/login', authControllers.sighIn);

authRouter.post('/logout', authenticate, authControllers.logout);

authRouter.get('/current', authenticate, authControllers.myProfile);

authRouter.patch('/subscription', authenticate, validateBody(updateSubscriptionSchema), authControllers.changeSubscription);

authRouter.patch('/avatars', authenticate, upload.single('avatar'), authControllers.updateAvatar);

export default authRouter;
