require("dotenv").config();
const axios = require("axios");
const { Recipe, Diet } = require("../db")
const { Router } = require("express");
const recipeRoute = Router();
const { API_KEY } = process.env;
const apiUrl = require("../../complexSearch.json")

const getApiInfo = async () => {
  // const apiUrl = await axios.get(
  //   `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=50`
  // );
  const apiInfo = apiUrl.results.map(el => {
    return {
        id: el.id,
        name: el.title,
        summary: el.summary,
        diets: el.diets.map(ele => ele),
        healthScore: el.healthScore,
        // steps: el.analyzedInstructions[0] ? el.analyzedInstructions[0].steps.map(ele => ele.step) : 'No contiene pasos a seguir',
        image: el.image
    };
  });
  return apiInfo;
};

const getDbInfo = async () => {
  return await Recipe.findAll({
    include: {
      model: Diet,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
};

const getAllRecipes = async () => {
  const apiInfo = await getApiInfo();
  const dbInfo = await getDbInfo();
  const infoTotal = apiInfo.concat(dbInfo);
  return infoTotal;
};

recipeRoute.get("/", async (req, res) => {
  let { name } = req.query
  try {
    const recipesTotal = await getAllRecipes();
    if(name){
      let recipeName = recipesTotal.filter(el => el.name.toLowerCase().includes(name.toLowerCase()))
      recipeName.length ? res.json(recipeName) : res.status(404).json("No hay reseta con ese nombre")
    } else {
      res.json(recipesTotal);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

recipeRoute.get("/:id", async (req, res) => {
  let { id } = req.params
  try {
    const recipesTotal = await getAllRecipes();
    if(id){
      let recipe = recipesTotal.find(el => el.id == id)
      recipe ? res.json(recipe) : res.status(404).json("No existe receta con ese id")
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
})

module.exports = recipeRoute;
