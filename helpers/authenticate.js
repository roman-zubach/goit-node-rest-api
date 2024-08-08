import HttpError from './HttpError.js';
import tokenManager from './tokenManager.js';
import { getUser } from '../services/userServices.js';

const authorizationHeaderName = 'Authorization';

const authenticate = async (req, res, next) => {
    const authorizationHeader = req.get(authorizationHeaderName);

    if (!authorizationHeader) {
        return next(HttpError(401, 'Authorization header is missing'));
    }

    const [bearer, token] = authorizationHeader.split(' ');

    if (bearer !== 'Bearer' || !token) {
        return next(HttpError(401, 'Invalid Authorization header format'));
    }

    try {
        const { id } = tokenManager.decode(token);

        req.user = await getUser({ id, token });

        next();
    } catch (e) {
        next(HttpError(401, 'Not authorized'));
    }
};

export default authenticate;
