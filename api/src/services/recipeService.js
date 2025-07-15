const { Recipe, Diet } = require('../db');
const recipesJSON = require('../../complexSearch.json');
const formatRecipeDescription = require('../functions/formatRecipeDescription');

const getApiInfo = async () => {
  return recipesJSON.results.map((el) => ({
    id: el.id.toString(),
    name: el.title,
    summary: formatRecipeDescription(el.summary),
    diets: el.diets.map((ele) => ele),
    healthScore: el.healthScore,
    image: el.image,
  }));
};

const getDbInfo = async () => {
  return await Recipe.findAll({
    include: {
      model: Diet,
      attributes: ['name'],
      through: { attributes: [] },
    },
  });
};

const getAllRecipes = async () => {
  try {
    const [apiInfo, dbInfo] = await Promise.all([getApiInfo(), getDbInfo()]);
    const infoTotal = apiInfo.concat(dbInfo);
    return infoTotal;
  } catch (error) {
    console.log(error);
  }
};

const getRecipeById = async (id) => {
  const recipes = await getAllRecipes();
  const findEntry = recipes.find((r) => r.id === id);
  return findEntry;
};

const deleteRecipe = async (id) => {
  const recipe = await Recipe.findByPk(id);
  if (!recipe) return undefined;

  await recipe.destroy();
  return `La receta con el id ${id} se eliminó correctamente`;
};

const create = async (obj) => {
  const newEntry = await Recipe.create({
    ...obj,
    image: obj.image
      ? obj.image
      : 'https://health.gov/sites/default/files/2019-06/SVG%20Layer4.svg',
  });

  const dietDb = await Diet.findAll({
    where: { name: obj.diets },
  });

  newEntry.addDiet(dietDb);

  return newEntry;
};

module.exports = {
  getApiInfo,
  getDbInfo,
  getAllRecipes,
  getRecipeById,
  deleteRecipe,
  create,
};
