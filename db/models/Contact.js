import {DataTypes} from 'sequelize';

import sequelize from '../sequelize.js';
import User from './User.js';

const Contact = sequelize.define(
    'contact', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        favorite: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    });

Contact.belongsTo(User, {
    foreignKey: {
        name: 'owner',
        allowNull: false,
    },
    onDelete: 'CASCADE',
});

export default Contact;
