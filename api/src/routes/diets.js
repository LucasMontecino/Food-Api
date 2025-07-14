const express = require('express');
const dietService = require('../services/dietService');

const dietRouter = express.Router();

dietRouter.get('/', async (_req, res) => {
  try {
    const dietsTotal = await dietService.getApiInfo();
    res.json(dietsTotal);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = dietRouter;
