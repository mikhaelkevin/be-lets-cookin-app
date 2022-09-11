const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const ErrorResponse = require('../../utils/errorResponse');

const { registerModel, loginModel } = require('../models/Auth');

const register = async (req, res) => {
  const { password, repeatPassword, ...userInformation } = req?.body;

  const salt = bcrypt.genSaltSync(8);
  userInformation.password = bcrypt?.hashSync(password, salt);
  await registerModel(userInformation);

  res.status(200).send({ message: 'Register success' });
};

const login = async (req, res) => {
  const { email, password } = req?.body;

  const doLogin = await loginModel({ email });
  const userInformation = doLogin?.rows?.[0];

  const passwordIsMatch = bcrypt.compareSync(password, userInformation?.password);
  if (!passwordIsMatch) throw new ErrorResponse('Incorrect email or password', 401);

  const { password: unusedVariable, ...tokenPayload } = userInformation;
  const token = jwt?.sign(tokenPayload, process.env.PRIVATE_KEY, { expiresIn: '12h' });

  res.status(200).send({ message: 'Login success', token });
};

module.exports = { register, login };
