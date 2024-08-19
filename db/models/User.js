import {DataTypes} from 'sequelize';

import sequelize from '../sequelize.js';
import {emailRegex, UserSubscriptionConstants} from "../../constants/userConstants.js";

const User = sequelize.define(
    'user', {
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
                customEmailPattern(value) {
                    if (!emailRegex.test(value)) {
                        throw new Error('Invalid email format');
                    }
                }
            }
        },
        subscription: {
            type: DataTypes.ENUM,
            values: Object.values(UserSubscriptionConstants),
            defaultValue: UserSubscriptionConstants.STARTER
        },
        token: {
            type: DataTypes.STRING,
            defaultValue: null,
        },
        avatarURL: DataTypes.STRING,
    },
);

export default User;
