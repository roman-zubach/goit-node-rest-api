import { UniqueConstraintError } from 'sequelize';

import { cntrWraper } from '../helpers/cntrWraper.js';
import * as userServices from '../services/userServices.js';
import HttpError from '../helpers/HttpError.js';

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
    const { user: { email, subscription } } = req;

    res.json({ user: { email, subscription }});
};

const changeSubscription = async (req, res) => {
    const { user } = req;

    await userServices.updateUser(user, req.body);

    const { email, subscription } = user;

    res.json({ user: { email, subscription }});
};

export default {
    sighUp: cntrWraper(sighUp),
    sighIn: cntrWraper(sighIn),
    logout: cntrWraper(logout),
    myProfile: cntrWraper(myProfile),
    changeSubscription: cntrWraper(changeSubscription),
};
