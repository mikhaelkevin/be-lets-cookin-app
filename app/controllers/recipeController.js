const { uploader } = require('../../config/cloudinary');

const { dataUri } = require('../middlewares/multerHandler');

const { getRecipesModel, createRecipeModel } = require('../models/Recipe');
const { getUserByIdModel } = require('../models/User');

const getRecipes = async (req, res) => {
  const { page, limit } = req?.query;
  const offset = (limit * page) - limit;

  const getRecipesData = await getRecipesModel({ ...req?.query, offset });
  const recipesData = getRecipesData?.rows;

  res.status(200).send(recipesData);
};

const createRecipe = async (req, res) => {
  let pictureUrl, pictureUrlId;
  const stepVideosUrl = [];
  const stepVideosUrlId = [];

  if (req?.files?.picture) {
    const doUploadPicture = await Promise.all(
      req?.files?.picture?.map(async (data) =>
        await uploader?.upload(
          dataUri(data).content,
          { folder: 'lets-cookin-v2/desktop/recipe-pictures' }
        )
      ));

    const pictureCredentials = doUploadPicture?.[0];
    pictureUrl = pictureCredentials?.secure_url;
    pictureUrlId = pictureCredentials?.public_id;
  }

  if (req?.files?.stepVideos) {
    const doUploadVideos = await Promise.all(
      req?.files?.stepVideos?.map(async data =>
        await uploader?.upload(
          dataUri(data).content,
          {
            resource_type: 'video',
            folder: 'lets-cookin-v2/desktop/recipe-step-videos'
          }
        ))
    );

    doUploadVideos?.map(credentials => {
      stepVideosUrl.push(credentials?.secure_url);
      stepVideosUrlId.push(credentials?.public_id);
      return null;
    });
  }

  await getUserByIdModel({ ...req?.params });
  await createRecipeModel({
    ...req?.params,
    ...req?.body,
    pictureUrl,
    pictureUrlId,
    stepVideosUrl: JSON.stringify(stepVideosUrl),
    stepVideosUrlId: JSON.stringify(stepVideosUrlId)
  });

  res.status(200).send({ message: 'connected' });
};

module.exports = { getRecipes, createRecipe };
