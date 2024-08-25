import Joi from 'joi';
import { emailRegex, passwordRegex, UserSubscriptionConstants } from '../constants/userConstants.js';

export const sighUpSchema = Joi.object({
    email: Joi.string().pattern(emailRegex).required().messages({
        'string.pattern.base': 'Invalid email format.',
        'string.empty': 'Email is required.',
        'any.required': 'Email is required.',
    }),
    password: Joi.string().pattern(passwordRegex).required().messages({
        'string.pattern.base': 'Password must be at least 8 characters long and include both letters and numbers.',
        'string.empty': 'Password is required.',
        'any.required': 'Password is required.',
    }),
})

export const updateSubscriptionSchema = Joi.object({
    subscription: Joi.string().valid(...Object.values(UserSubscriptionConstants)).required().messages({
        'any.only': 'Invalid subscription value',
        'string.empty': 'Subscription is required',
    }),
});

export const resendVerificationEmailSchema = Joi.object({
    email: Joi.string().pattern(emailRegex).required().messages({
        'string.pattern.base': 'Invalid email format.',
        'string.empty': 'Email is required.',
        'any.required': 'Email is required.',
    }),
})
