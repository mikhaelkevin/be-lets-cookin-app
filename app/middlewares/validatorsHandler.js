// const Joi = require('joi');
const ErrorResponse = require('../../utils/errorResponse');
const Validators = require('../../utils/validators');

module.exports = function (validator) {
  return async function (req, res, next) {
    if (!Object.prototype.hasOwnProperty.call(Validators, validator)) return next(new ErrorResponse(`${validator} validator is not exist`, 404));
    try {
      const validated = await Validators[validator].validateAsync(req.body);
      req.body = validated;
      next();
    } catch (err) {
      if (err.isJoi) return next(new ErrorResponse(err?.message?.replace(/"/g, ''), 422));
    }
  };
};
