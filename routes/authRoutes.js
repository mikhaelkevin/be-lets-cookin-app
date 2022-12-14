const authRoutes = require('express').Router();
const { register, login } = require('../app/controllers/authController');
const asyncHandler = require('../app/middlewares/asyncHandler');
const Validator = require('../utils/validators/');

authRoutes.post('/register', Validator.register, asyncHandler(register));
authRoutes.post('/login', Validator.login, asyncHandler(login));

module.exports = authRoutes;
