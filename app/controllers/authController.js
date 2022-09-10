const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const ErrorResponse = require('../../utils/errorResponse');

const { registerModel, loginModel } = require('../models/Auth');

const register = async (req, res) => {
  const { password, repeatPassword, ...userCredentials } = req?.body;

  const salt = bcrypt.genSaltSync(8);
  userCredentials.password = bcrypt?.hashSync(password, salt);
  await registerModel(userCredentials);

  res.status(200).send({ message: 'Register success' });
};

const login = async (req, res) => {
  const { email, password } = req?.body;

  const doLogin = await loginModel({ email });
  const userCredentials = doLogin?.rows?.[0];

  const passwordIsMatch = bcrypt.compareSync(password, userCredentials?.password);
  if (!passwordIsMatch) throw new ErrorResponse('Incorrect email or password', 401);

  const { password: unusedVariable, ...tokenPayload } = userCredentials;
  const token = jwt?.sign(tokenPayload, process.env.PRIVATE_KEY, { expiresIn: '12h' });

  res.status(200).send({ message: 'Login success', token });
};

module.exports = { register, login };
