const { Joi, celebrate, Segments } = require('celebrate');

const getRecipesSchema = celebrate({
  [Segments.QUERY]: Joi.object({
    page: Joi.number()
      .empty('', null)
      .default(1),

    limit: Joi.number()
      .empty('', null)
      .default(null),

    sorting: Joi.string()
      .empty('', null)
      .uppercase()
      .valid('ASC', 'DESC')
      .default('ASC')
  })
});

const createRecipeSchema = celebrate({
  [Segments.PARAMS]: Joi.object({
    userId: Joi.number()
  }),
  [Segments.BODY]: Joi.object().keys({
    title: Joi.string().required(),
    ingredients: Joi.string().required()
  })
});

module.exports = { getRecipesSchema, createRecipeSchema };
