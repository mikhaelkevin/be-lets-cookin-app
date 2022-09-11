const recipeRoutes = require('express').Router();
const asyncHandler = require('../app/middlewares/asyncHandler');

const { uploadRecipeMedia } = require('../app/middlewares/multerHandler');
const Validator = require('../utils/validators');

const { getRecipes, createRecipe, patchRecipe, deleteRecipe } = require('../app/controllers/recipeController');

recipeRoutes.get('/', Validator.getAllRecipe, asyncHandler(getRecipes));

recipeRoutes.post('/user/:userId', uploadRecipeMedia, Validator.createRecipe, asyncHandler(createRecipe));

recipeRoutes.patch('/:recipeId', asyncHandler(patchRecipe))
  .delete('/:recipeId', asyncHandler(deleteRecipe));

module.exports = recipeRoutes;
