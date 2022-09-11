const {
  loginSchema: login,
  registerSchema: register
} = require('./authSchema');

const {
  getRecipesSchema: getAllRecipe,
  createRecipeSchema: createRecipe
} = require('./recipeSchema');

module.exports = { login, register, getAllRecipe, createRecipe };
