import passwordManager from '../helpers/passwordManager.js';
import User from '../db/models/User.js';
import HttpError from '../helpers/HttpError.js';
import tokenManager from '../helpers/tokenManager.js';

export const createUser = async data => {
    const {email, password: plainPassword} = data;

    const password = passwordManager.hashPassword(plainPassword);

    return User.create({
        email,
        password,
    });
};

export const getUser = async query => User.findOne({ where: query, rejectOnEmpty: true });

export const findUser = async query => User.findOne({ where: query });

export const sighIn = async data => {
    const { email, password } = data;

    const user = await findUser({ email });

    if (!user || !passwordManager.isPasswordValid(password, user?.password)) {
        throw HttpError(401, 'Email or password is wrong');
    }

    const token = tokenManager.generate({ id: user.id });

    await user.update({ token });

    return user;
};

export const updateUser = async (user, data) => user.update(data);
