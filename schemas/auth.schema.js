const joi = require('joi');

const email = joi.string().email();
const password = joi.string().min(6).max(50);
const newPassword = joi.string().min(6).max(50);
const token = joi.string().regex(
    /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_.+/=]*$/
);

const loginAuthSchema = joi.object({
    email: email.required(),
    password: password.required()
});

const recoveryAuthSchema = joi.object({
    email: email.required()
});

const resetAuthSchema = joi.object({
    token: token.required(),
    password: newPassword.required()
});

module.exports = { loginAuthSchema, recoveryAuthSchema, resetAuthSchema };




