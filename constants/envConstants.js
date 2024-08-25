import dotenv from 'dotenv';

dotenv.config();

const envConstants = process.env;

export const HOST = envConstants.HOST || 'http://localhost';
export const PORT = envConstants.PORT || 3000;
export const DB_URL = envConstants.DB_URL;
export const JWT_SECRET = envConstants.JWT_SECRET;
export const API_UKR_NET_EMAIL = envConstants.API_UKR_NET_EMAIL;
export const API_UKR_NET_PASSWORD = envConstants.API_UKR_NET_PASSWORD;
