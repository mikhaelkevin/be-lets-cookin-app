const { isCelebrateError } = require('celebrate');

const errorHandler = (error, req, res, next) => {
  // console.log('error :>> ', error);
  const celebrateParamsError = error?.details?.get('params')?.message;
  const celebrateQueryError = error?.details?.get('query')?.message;
  const celebrateBodyError = error?.details?.get('body')?.message;

  if (error?.code === '23505' && error?.constraint === 'users_email_key') error.message = 'Email has been taken';
  if (error?.code === '23505' && error?.constraint === 'users_profile_phone_number_key') error.message = 'Phone number has been taken';
  if (error?.code === 'LIMIT_UNEXPECTED_FILE' && error?.field === 'stepVideos') error.message = 'Max total videos is 4';

  if (isCelebrateError(error) && celebrateParamsError) {
    error.status = 422;
    error.message = celebrateParamsError.replace(/"/g, '');
  };

  if (isCelebrateError(error) && celebrateQueryError) {
    error.status = 422;
    error.message = celebrateQueryError.replace(/"/g, '');
  };

  if (isCelebrateError(error) && celebrateBodyError) {
    error.status = 422;
    error.message = celebrateBodyError.replace(/"/g, '');
  };

  res.status(error?.status || 500).send({ message: error?.message || 'Internal Server Error' });
};

module.exports = errorHandler;
