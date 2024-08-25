import nodemailer from 'nodemailer';
import { API_UKR_NET_EMAIL, API_UKR_NET_PASSWORD } from "../constants/envConstants.js";

const config = {
    host: 'smtp.ukr.net',
    port: 2525,
    secure: true,
    auth: {
        user: API_UKR_NET_EMAIL,
        pass: API_UKR_NET_PASSWORD,
    },
};

const transporter = nodemailer.createTransport(config);

const sendEmail = emailOptions => {
    transporter.sendMail({
        ...emailOptions,
        from: API_UKR_NET_EMAIL,
    });
}
export default sendEmail;
