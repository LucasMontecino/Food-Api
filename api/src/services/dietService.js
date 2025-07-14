const { Diet } = require('../db');
const recipesJSON = require('../../complexSearch.json');

const getApiInfo = async () => {
  const apiInfo = recipesJSON.results.map((el) =>
    el.diets.length ? el.diets : null
  );
  const apiFiltrado = apiInfo.filter((el) => el);
  const array3 = apiFiltrado.join(',').split(',');
  const array4 = new Set(array3);
  const array5 = Array.from(array4);
  array5.forEach((el) => {
    Diet.findOrCreate({
      where: { name: el },
    });
  });
  const allDiets = await Diet.findAll();
  return allDiets;
};

module.exports = {
  getApiInfo,
};
