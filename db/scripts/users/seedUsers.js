import User from '../../models/User.js';
import { UserSubscriptionConstants } from "../../../constants/userConstants.js";
import passwordManager from "../../../helpers/passwordManager.js";

const seedUsers = async () => {
    const usersData = [
        {
            password: passwordManager.hashPassword('password@123'),
            email: 'user1@example.com',
        },
        {
            password: passwordManager.hashPassword('password@456'),
            email: 'user2@example.com',
            subscription: UserSubscriptionConstants.PRO,
        }
    ];

    await User.bulkCreate(usersData);
};

export default seedUsers;
