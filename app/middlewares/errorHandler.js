const errorHandler = (error, req, res, next) => {
  console.log('error handler :>> ', error?.message);
  if (error?.code === '23505' && error?.constraint === 'users_email_key') error.message = 'Email has been taken';
  if (error?.code === '23505' && error?.constraint === 'users_profile_phone_number_key') error.message = 'Phone number has been taken';

  res.status(error?.status || 500).send({ message: error?.message || 'Internal Server Error' });
};

module.exports = errorHandler;
