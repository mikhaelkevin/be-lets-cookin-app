const db = require('../../config/database');
const ErrorResponse = require('../../utils/errorResponse');

const registerModel = (requestData) => {
  return new Promise((resolve, reject) => {
    db.query(`WITH credentialInformation AS (INSERT INTO users(email, password)
        VALUES($1, $2) RETURNING id)
        INSERT INTO users_profile(user_id, name, phone_number)
        SELECT id, $3, $4 FROM credentialInformation`,
    [requestData?.email, requestData?.password, requestData?.name, requestData?.phoneNumber],
    (error, result) => {
      if (error) return reject(error);
      resolve(result);
    }
    );
  });
};

const loginModel = (requestData) => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT users.*, users_profile.name, users_profile.phone_number, users_profile.profile_picture
    FROM users
    JOIN users_profile ON users.id = users_profile.user_id
    WHERE users.email=$1`,
    [requestData?.email],
    (error, result) => {
      if (error) return reject(error);
      if (!result?.rowCount) reject(new ErrorResponse('incorrect email or password', 401));
      resolve(result);
    });
  });
};

module.exports = { registerModel, loginModel };
