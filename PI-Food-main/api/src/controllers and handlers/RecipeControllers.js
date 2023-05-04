const { API_KEY } = process.env;
const axios = require("axios");
const { Recipe, Diet } = require("../db");


const getRecipesApi = async () => {
	const responseApi = await axios.get(
		`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`
	);

	return responseApi.data.results.map((x) => {
		return {
			id: x.id,
			title: x.title,
			summary: x.summary,
			healthScore: x.healthScore,
			steps: x.steps,
			image:
				x.image,
			diets: x.diets.map((y) => y),
		};
	});
};

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
				x.dataValues.image ||burgur,
			diets: x.dataValues.diets.map((y) => y.name),
		};
	});
};

const getRecipeByIDinBoth = async (id) => {
	if(isNaN(id)){
		return await Recipe.findByPk(id);
	}
	else{
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
}

module.exports = { getRecipesApi, getRecipesDb, getRecipeByIDinBoth };