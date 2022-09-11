const multer = require('multer');
const DatauriParser = require('datauri/parser');
const path = require('path');

const ErrorResponse = require('../../utils/errorResponse');

const storage = multer.memoryStorage();
const fileFilter = (req, file, callback) => {
  const uploadRules = {
    imageFormat: file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/svg',
    pictureField: file.fieldname === 'picture',
    videoFormat: file.mimetype === 'video/mp4',
    videoField: file.fieldname === 'stepVideos'
  };

  const pictureFormatNotValid = uploadRules.pictureField && !uploadRules.imageFormat;
  const videoFormatNotValid = uploadRules.videoField && !uploadRules.videoFormat;

  // User & Recipe validate for file format
  if (pictureFormatNotValid) return callback(new ErrorResponse('Only .png, .jpg, .jpeg, .svg is supported', 422), false);
  if (videoFormatNotValid) return callback(new ErrorResponse('Only .mp4 is supported', 422), false);
  callback(null, true);
};

const uploadUserProfileMedia = multer({ storage, fileFilter, limits: { fieldSize: 3072 } }).single('picture');
const uploadRecipeMedia = multer({ storage, fileFilter }).fields([{ name: 'picture', maxCount: 1 }, { name: 'stepVideos', maxCount: 4 }]);

const dUri = new DatauriParser();
const dataUri = (file) => dUri.format(path.extname(file?.originalname).toString(), file?.buffer);

module.exports = { uploadUserProfileMedia, uploadRecipeMedia, dataUri };
