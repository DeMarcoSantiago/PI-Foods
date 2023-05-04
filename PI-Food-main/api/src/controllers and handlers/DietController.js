const { default: axios } = require("axios");
const { Diet } = require("../db");
const { getRecipesApi } = require("./RecipeControllers");

const getDietsTypesApi = async () => {
  const recipesApi = await getRecipesApi();

  const dietAllApi = recipesApi.map((x) => x.diets);

  const dietsAll = [];

  dietAllApi.forEach((x) => x.forEach((y) => dietsAll.push(y)));

  return [...new Set(dietsAll)];
};

const getDietsTypesDb = async () => {
    const allDiets = await Diet.findAll({attributes: ["name", "id"],})

    const dietsAllArray = [];

    dietsAll.forEach((x) => dietsAllArray.push({ name: x.name, id: x.id }));
  
    return dietsAllArray;
}
const postDiets = async () => {
    const dietsTypes = await getDietsTypesApi();
    let allDietTypes = dietsTypes.map((e) =>
      Diet.findOrCreate({ where: { name: e } })
    );
    Promise.all(allDietTypes).then((e) => console.log("Dietas Cargadas"));
  };

  module.exports = { getDietsTypesDb, getDietsTypesApi, postDiets,};