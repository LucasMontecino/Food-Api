const express = require('express');
const recipeService = require('../services/recipeService');

const recipeRouter = express.Router();

recipeRouter.get('/', async (req, res) => {
  const { name, diet, created } = req.query;
  try {
    const recipesTotal = await recipeService.getAllRecipes();
    if (name) {
      let recipeName = recipesTotal.filter((el) =>
        el.name.toLowerCase().includes(name.toLowerCase())
      );
      recipeName.length
        ? res.json(recipeName)
        : res.status(404).json('No hay receta con ese nombre');
    } else if (diet) {
      let filteredByDiet = recipesTotal.filter((el) => el.diets.includes(diet));
      filteredByDiet.length
        ? res.json(filteredByDiet)
        : res.status(404).json('No hay receta con ese tipo de dieta');
    } else if (created) {
      let filterByFlag =
        created === 'api'
          ? recipesTotal.filter((el) => !el.createdInDb)
          : created === 'db'
          ? recipesTotal.filter((el) => el.createdInDb)
          : recipesTotal;
      filterByFlag.length
        ? res.status(200).json(filterByFlag)
        : res.status(404).json('Algo no salió bien!');
    } else {
      res.json(recipesTotal);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

recipeRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const recipe = await recipeService.getRecipeById(id);
    if (!recipe) throw new Error('No se encontró ninguna receta');

    return res.status(200).json(recipe);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

recipeRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const recipeDeleted = await recipeService.deleteRecipe(id);
    if (!recipeDeleted) throw new Error('No se encontró ninguna receta');

    return recipeDeleted;
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

recipeRouter.post('/', async (req, res) => {
  const { name, summary, healthScore, image, createdInDb, diets } = req.body;

  try {
    const newEntry = await recipeService.create({
      name,
      summary,
      healthScore,
      image,
      createdInDb,
      diets,
    });
    return res.status(201).json(newEntry);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = recipeRouter;
