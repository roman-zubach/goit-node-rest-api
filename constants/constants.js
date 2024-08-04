import dotenv from 'dotenv';

dotenv.config();

const constants = process.env;

export const PORT = constants.PORT || 3000;
export const DB_URL = constants.DB_URL;
