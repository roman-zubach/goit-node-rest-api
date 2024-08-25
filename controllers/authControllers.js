import { UniqueConstraintError } from 'sequelize';

import { cntrWraper } from '../helpers/cntrWraper.js';
import * as userServices from '../services/userServices.js';
import HttpError from '../helpers/HttpError.js';
import fileManager from "../helpers/fileManager.js";

const sighUp = async (req, res) => {
    try {
        const { email, subscription } = await userServices.createUser(req.body);

        res.status(201).json({ user: { email, subscription }});
    } catch (error) {
        if (error instanceof UniqueConstraintError) throw HttpError(409, 'Email in use');
    }
};

const sighIn = async (req, res) => {
    const { token, email, subscription } = await userServices.sighIn(req.body);

    res.json({
        token,
        user: {
            email,
            subscription,
        },
    });
};

const logout = async (req, res) => {
    const { user } = req;

    await userServices.updateUser(user, { token: null });

    res.status(204).send();
};

const myProfile = async (req, res) => {
    const { user: { email, subscription, avatarURL } } = req;

    res.json({ user: { email, subscription, avatarURL }});
};

const changeSubscription = async (req, res) => {
    const { user } = req;

    await userServices.updateUser(user, req.body);

    const { email, subscription } = user;

    res.json({ user: { email, subscription }});
};

const updateAvatar = async (req, res) => {
    const { user, file, protocol } = req;
    const host = req.get('host');

    if (!file) throw HttpError(400, 'Avatar is required');

    const filePath = await fileManager.save(file, 'avatars');

    const avatarURL = `${protocol}://${host}/${filePath}`;

    await userServices.updateUser(user, { avatarURL });

    res.json({ avatarURL });
};

const verifyEmail = async (req, res) => {
    const { verificationToken } = req.params;

    const user = await userServices.findUser({verificationToken});

    if (!user) throw HttpError(404, 'User not found');

    await userServices.updateUser(user, {
        verificationToken: null,
        verify: true,
    });

    res.json({
        message: 'Verification successful',
    });
}

const resendVerificationEmail = async (req, res) => {
    const { email } = req.body;

    const user = await userServices.findUser({email});

    if (!user) throw HttpError(404, 'User not found');

    if (user.verify) throw HttpError(400, 'Verification has already been passed');

    userServices.sendVerifyEmail(user);

    res.json({
        message: 'Verification email sent',
    });
};

export default {
    sighUp: cntrWraper(sighUp),
    sighIn: cntrWraper(sighIn),
    logout: cntrWraper(logout),
    myProfile: cntrWraper(myProfile),
    changeSubscription: cntrWraper(changeSubscription),
    updateAvatar: cntrWraper(updateAvatar),
    verifyEmail: cntrWraper(verifyEmail),
    resendVerificationEmail: cntrWraper(resendVerificationEmail),
};
