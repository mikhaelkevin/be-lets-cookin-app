const Joi = require('joi');

const loginSchema = Joi.object({
  email: Joi.string()
    .required()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),

  password: Joi.string()
    .required()
}).with('email', 'password');

const registerSchema = Joi.object({
  name: Joi.string()
    .min(4)
    .required(),

  email: Joi.string()
    .required()
    .min(6)
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),

  password: Joi.string()
    .min(6)
    .required(),

  rePassword: Joi.ref('password'),

  phoneNumber: Joi.string()
    .pattern(/^[0-9]+$/)
    .min(6)
    .max(15)
});

module.exports = { loginSchema, registerSchema };
