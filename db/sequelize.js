import {Sequelize} from 'sequelize';
import {DB_URL} from '../constants/constants.js';

const sequelize = new Sequelize(DB_URL, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: true,
    },
});

export default sequelize;
