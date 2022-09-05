const authRoutes = require('express').Router();
const { register, login } = require('../app/controllers/authController');
const asyncHandler = require('../app/middlewares/asyncHandler');

authRoutes.post('/register', asyncHandler(register));
authRoutes.post('/login', asyncHandler(login));

module.exports = authRoutes;
