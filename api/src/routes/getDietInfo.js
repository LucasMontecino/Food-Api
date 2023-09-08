require("dotenv").config();
const axios = require("axios");
const { Recipe, Diet } = require("../db");
const { Router } = require("express");
const dietRoute = Router();
const { API_KEY } = process.env;
const apiUrl = require("../../complexSearch.json");

const getApiInfo = async () => {
    const apiInfo = apiUrl.results.map(el => el.diets.length ? el.diets : null)
    const apiFiltrado = apiInfo.filter(el => el)
    const array3 = apiFiltrado.join(",").split(",");
    const array4 = new Set(array3)
    const array5 = Array.from(array4);
    array5.forEach(el => {
        Diet.findOrCreate({
            where: { name: el }
        })
    })
    const allDiets = await Diet.findAll();
    return allDiets;
};

dietRoute.get("/", async (req, res) => {
    try {
        const dietsTotal = await getApiInfo()
        res.json(dietsTotal)
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = dietRoute;
