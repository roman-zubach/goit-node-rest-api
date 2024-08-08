import dotenv from 'dotenv';

dotenv.config();

const envConstants = process.env;

export const PORT = envConstants.PORT || 3000;
export const DB_URL = envConstants.DB_URL;
export const JWT_SECRET = envConstants.JWT_SECRET;
