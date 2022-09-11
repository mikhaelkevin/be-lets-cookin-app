const { Joi, celebrate, Segments } = require('celebrate');

const loginSchema = celebrate({
  [Segments.BODY]: Joi.object({
    email: Joi.string()
      .required()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),

    password: Joi.string()
      .required()
  }).with('email', 'password')
});

const registerSchema = celebrate({
  [Segments.BODY]: Joi.object({
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

    repeatPassword: Joi.any()
      .valid(Joi.ref('password'))
      .required()
      .messages({
        'any.only': 'Password did not match'
      }),

    phoneNumber: Joi.string()
      .pattern(/^[0-9]+$/)
      .min(6)
      .max(15)
      .allow(null, '')
      .messages({
        'string.pattern.base': 'Invalid phone number'
      })
  })
});

module.exports = { loginSchema, registerSchema };
