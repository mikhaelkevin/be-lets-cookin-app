const db = require('../../config/database');
const ErrorResponse = require('../../utils/errorResponse');

const getUserByIdModel = (requestData) => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * from users WHERE id = $1',
      [requestData?.userId],
      (error, result) => {
        if (error) return reject(error);
        if (!result?.rowCount) return reject(new ErrorResponse('User not found', 404));
        resolve(result);
      });
  });
};

module.exports = { getUserByIdModel };
