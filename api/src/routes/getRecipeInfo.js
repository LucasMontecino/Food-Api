require("dotenv").config();
const axios = require("axios");
const { Recipe, Diet } = require("../db");
const { Router } = require("express");
const recipeRoute = Router();
const { API_KEY } = process.env;
const apiUrl = require("../../complexSearch.json");

const getApiInfo = async () => {
  return apiUrl.results.map((el) => ({
    id: el.id,
    name: el.title,
    summary: el.summary,
    diets: el.diets.map((ele) => ele),
    healthScore: el.healthScore,
    image: el.image,
  }));
};

const getDbInfo = async () => {
  return await Recipe.findAll({
    include: {
      model: Diet,
      attributes: ["name"],
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

recipeRoute.get("/", async (req, res) => {
  let { name, diet, created } = req.query;
  try {
    const recipesTotal = await getAllRecipes();
    if (name) {
      let recipeName = recipesTotal.filter((el) =>
        el.name.toLowerCase().includes(name.toLowerCase())
      );
      recipeName.length
        ? res.json(recipeName)
        : res.status(404).json("No hay receta con ese nombre");
    } else if (diet) {
      let filteredByDiet = recipesTotal.filter((el) => el.diets.includes(diet));
      filteredByDiet.length
        ? res.json(filteredByDiet)
        : res.status(404).json("No hay receta con ese tipo de dieta");
    } else if (created) {
      let filterByFlag =
        created === "api"
          ? recipesTotal.filter((el) => !el.createdInDb)
          : created === "db"
          ? recipesTotal.filter((el) => el.createdInDb)
          : recipesTotal;
      filterByFlag.length
        ? res.status(200).json(filterByFlag)
        : res.status(404).json("Algo no salió bien!");
    } else {
      res.json(recipesTotal);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

recipeRoute.get("/:id", async (req, res) => {
  let { id } = req.params;
  try {
    const recipesTotal = await getAllRecipes();
    if (id) {
      let recipe = recipesTotal.find((el) => el.id == id);
      recipe
        ? res.json(recipe)
        : res.status(404).json("No existe receta con ese id");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

recipeRoute.delete("/:id", async (req, res) => {
  let { id } = req.params;
  try {
    let recipe = await Recipe.findByPk(id);
    await Recipe.destroy({
      where: { name: recipe.name },
    });
    res.status(200).json(`Se elimino la receta ${recipe.name}`);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = recipeRoute;
