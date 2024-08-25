import { url as gravatarUrl } from 'gravatar';
import { nanoid } from "nanoid";

import passwordManager from '../helpers/passwordManager.js';
import User from '../db/models/User.js';
import HttpError from '../helpers/HttpError.js';
import tokenManager from '../helpers/tokenManager.js';
import {HOST, PORT} from "../constants/envConstants.js";
import sendEmail from "../helpers/sendEmail.js";

export const createUser = async data => {
    const {email, password: plainPassword} = data;

    const password = passwordManager.hashPassword(plainPassword);
    const avatarURL = gravatarUrl(email,{protocol: 'http', s: '100'});
    const verificationToken = nanoid();

    const user = await User.create({
        email,
        password,
        avatarURL,
        verificationToken,
    });

    sendVerifyEmail(user);

    return user;
};

export const getUser = async query => User.findOne({ where: query, rejectOnEmpty: true });

export const findUser = async query => User.findOne({ where: query });

export const sighIn = async data => {
    const { email, password } = data;

    const user = await findUser({ email });

    if (!user || !passwordManager.isPasswordValid(password, user?.password))
        throw HttpError(401, 'Email or password is wrong');

    if (!user.verify) throw HttpError(403, 'Email not verified');

    const token = tokenManager.generate({ id: user.id });

    await user.update({ token });

    return user;
};

export const updateUser = async (user, data) => user.update(data);

export const sendVerifyEmail = ({ email, verificationToken }) => {
    const verifyLink = `${HOST}:${PORT}/api/auth/verify/${verificationToken}`;

    const emailOptions = {
        to: email,
        subject: 'Email Verification',
        html: `<p>Please verify your email by clicking on the following link:</p><a href="${verifyLink}" target="_blank">Click</a>`
    }

    sendEmail(emailOptions);
}
