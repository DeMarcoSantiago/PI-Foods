const { default: axios } = require("axios");
// Requerimos el modelo de la tabla Diet de la base de datos
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
  // Utilizamos el metodo finAll de sequelize en el modelo Diet para acceder a todos los atributos
  const dietsAll = await Diet.findAll({
    // mediante la opcion attributes especificamos cuales son los unicos que queremos
    attributes: ["name", "id"],
  });

  // console.log(dietsAll);

  const dietsAllArray = [];

  dietsAll.forEach((x) => dietsAllArray.push({ name: x.name, id: x.id }));

  return dietsAllArray;

  // Recorremos dietAll para pushear en el nuevo array dietsAllArray todo nuevamente.
};

const postDiets = async () => {
  const dietsTypes = await getDietsTypesApi();
  let allDietTypes = dietsTypes.map((e) =>
    Diet.findOrCreate({ where: { name: e } })
  );
  Promise.all(allDietTypes).then((e) => console.log("Dietas Cargadas"));
};

module.exports = { getDietsTypesDb, getDietsTypesApi, postDiets };
const getRecipesDb = async () => {
	const res = await Recipe.findAll({
		attributes: ["id", "title", "summary", "healthScore", "steps", "image"],
		include: { model: Diet },
	});

	return await res.map((x) => {
		return {
			id: x.dataValues.id,
			title: x.dataValues.title,
			summary: x.dataValues.summary,
			healthScore: x.dataValues.healthScore,
			steps: x.dataValues.steps,
			image:
				x.dataValues.image ||
				"https://st3.depositphotos.com/1064969/18252/v/450/depositphotos_182528054-stock-illustration-flat-grayscale-icon-burger.jpg",
			diets: x.dataValues.diets.map((y) => y.name),
		};
	});
};

const getRecipeById = async (id) => {
	const source = isNaN(id) ? "bdd" : "api";

	if (source === "api") {
		const recipe = await axios.get(
			`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}&number=100`
		);
		return {
			id: recipe.data.id,
			title: recipe.data.title,
			summary: recipe.data.summary,
			healtscore: recipe.data.healthScore,
			steps: recipe.data.analyzedInstructions[0].steps,
			image: recipe.data.image,
			diets: recipe.data.diets,
		};
	}

	return await Recipe.findByPk(id);

	// recipe =
	// 	source === "api"
	// 		? await axios.get(
	// 				`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}&number=100`
	// 		  )
	// 		: await Recipe.findByPk(id);
	// return source === "api" ? recipe.data : recipe;
};

module.exports = { getRecipesApi, getRecipesDb, getRecipeById };