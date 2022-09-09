const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { registerValidator, loginValidator } = require('../middlewares/validator/authValidator');
const { registerModel, loginModel } = require('../models/Auth');
const regularTrim = require('../../utils/dataTrimmer');
const ErrorResponse = require('../../utils/errorResponse');

const register = async (req, res) => {
  const registrationRequestData = regularTrim(req?.body);
  const validatedData = registerValidator(registrationRequestData);

  const salt = bcrypt?.genSaltSync(7);
  validatedData.password = bcrypt?.hashSync(validatedData?.password, salt);

  await registerModel({ ...validatedData });

  res.status(200).send({ message: 'Register success' });
};

const login = async (req, res) => {
  const loginRequestData = regularTrim(req?.body);
  const validatedData = loginValidator(loginRequestData);

  const loginDataFetcher = await loginModel({ ...validatedData });
  const loginData = loginDataFetcher?.rows?.[0];

  const passwordIsMatch = bcrypt.compareSync(validatedData.password, loginData.password);
  if (!passwordIsMatch) throw new ErrorResponse("password isn't match");

  const { password, ...tokenPayload } = loginData;
  const token = jwt.sign(tokenPayload, process.env.PRIVATE_KEY, { expiresIn: '24h' });

  res.status(200).send({ token });
};

module.exports = { register, login };
