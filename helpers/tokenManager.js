import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../constants/envConstants.js';

const generate = payload => jwt.sign(payload, JWT_SECRET, { expiresIn: '24h' });

const decode = token => jwt.verify(token, JWT_SECRET);

export default {
    generate,
    decode,
}
