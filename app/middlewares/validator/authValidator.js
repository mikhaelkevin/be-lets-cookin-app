const Ajv = require('ajv').default;
const ajv = new Ajv({ allErrors: true });
const addFormats = require('ajv-formats');
const ErrorResponse = require('../../../utils/errorResponse');
require('ajv-errors')(ajv);

const registerValidator = (data) => {
  addFormats(ajv, ['email']);
  const schema = {
    type: 'object',
    required: ['name', 'email', 'password'],
    errorMessage: {
      required: 'missing required field'
    },
    properties: {
      name: {
        type: 'string',
        minLength: 2,
        errorMessage: {
          minLength: 'minimum of name length is 2'
        }
      },
      email: {
        type: 'string',
        format: 'email',
        errorMessage: {
          format: 'invalid email format'
        }
      },
      phoneNumber: {
        type: 'string',
        minLength: 4,
        errorMessage: {
          minLength: 'minimum of phone number length is 9'
        }
      },
      password: {
        type: 'string',
        minLength: 6,
        errorMessage: {
          minLength: 'minimum of password length is 6'
        }
      }
    },
    additionalProperties: false
  };
  const validate = ajv.compile(schema);
  const valid = validate(data);
  if (isNaN(Number(data?.phoneNumber))) throw new ErrorResponse('invalid phone number format', 422);
  if (!valid) throw new ErrorResponse(validate?.errors?.[0]?.message, 422);

  return data;
};

const loginValidator = (data) => {
  addFormats(ajv, ['email']);

  const schema = {
    type: 'object',
    required: ['email', 'password'],
    errorMessage: {
      required: 'missing required field'
    },
    properties: {
      email: {
        type: 'string',
        format: 'email',
        errorMessage: {
          format: 'invalid email format'
        }
      },
      password: {
        type: 'string'
      }
    },
    additionalProperties: false
  };

  const validate = ajv.compile(schema);
  const valid = validate(data);
  if (!valid) throw new ErrorResponse(validate?.errors?.[0]?.message, 422);

  return data;
};

module.exports = { registerValidator, loginValidator };
