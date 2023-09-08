const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const recipeRoute = require('./getRecipeInfo')
const dietRoute = require('./getDietInfo')
const postRecipe = require('./postRecipe')

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/recipes', recipeRoute)
router.use('/diets', dietRoute)
router.use('/recipes', postRecipe)

module.exports = router;
