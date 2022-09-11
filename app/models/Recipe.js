const db = require('../../config/database');
// const ErrorResponse = require('../../utils/errorResponse');

const getRecipesModel = (requestData) => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT recipes.*, media.*  FROM recipes as recipes
    JOIN recipes_media as media ON recipes.id = media.recipe_id
    ORDER BY recipes.title ${requestData?.sorting} LIMIT $1 OFFSET $2`,
    [requestData?.limit, requestData?.offset],
    (error, result) => {
      if (error) return reject(error);
      resolve(result);
    });
  });
};

const createRecipeModel = (requestData) => {
  return new Promise((resolve, reject) => {
    db.query(`WITH insertRecipe AS (
    INSERT INTO recipes(user_id, title, ingredients, created_at)
    VALUES($1, $2, $3, CURRENT_TIMESTAMP) RETURNING id) 
    INSERT INTO recipes_media
    SELECT id, $4, $5, $6, $7 FROM insertRecipe`,
    [requestData?.userId,
      requestData?.title,
      requestData?.ingredients,
      requestData?.pictureUrl,
      requestData?.pictureUrlId,
      requestData?.stepVideosUrl,
      requestData?.stepVideosUrlId],
    (error, result) => {
      if (error) return reject(error);
      resolve(result);
    });
  });
};

module.exports = { getRecipesModel, createRecipeModel };
