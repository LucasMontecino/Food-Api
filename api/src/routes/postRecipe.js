const { Recipe, Diet } = require("../db");
const { Router } = require("express");
const postRecipe = Router();

postRecipe.post("/", async (req, res) => {
    
        let { 
            name,
            summary,
            healthScore,
            image,
            createdInDb,
            diets
        } = req.body;

    try {
        let newRecipe = await Recipe.create({
            name,
            summary,
            healthScore,
            image: image ? image : "https://health.gov/sites/default/files/2019-06/SVG%20Layer4.svg",
            createdInDb,
        })
    
        let dietDb = await Diet.findAll({
            where: { name: diets }
        })
        
        newRecipe.addDiet(dietDb);

        res.send("Reseta creada con éxito!");

    } catch (error) {
        res.status(400).json({ message: error.message });
    }

})

module.exports = postRecipe;