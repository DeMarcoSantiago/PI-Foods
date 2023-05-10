const {
	getRecipesApi,
	getRecipesDb,
	getRecipeById,
} = require("../controllers/RecipeControllers");

const { Recipe } = require("../db");

const getRecipesHandler = async (req, res) => {
	const { name } = req.query;

	const [api, db] = await Promise.all([getRecipesApi(), getRecipesDb()]);

	const allRecipes = [...api, ...db];

	if (name) {
		try {
			let filterRecipe = allRecipes.filter((x) =>
				x.title.toLowerCase().includes(name.toLowerCase())
			);

			filterRecipe.length
				? res.status(200).send(filterRecipe)
				: res.status(401).send("No existe receta con ese nombre");
		} catch (error) {
			return res.status(401).send("Error");
		}
	} else {
		res.send(allRecipes);
	}
};

const getRecipeHandler = async (req, res) => {
	const { id } = req.params;

	const recipe = await getRecipeById(id);
	res.status(200).json(recipe);
};

const postRecipeHandler = async (req, res) => {
	const { title, summary, healthScore, steps, image, diets } = req.body;

	let recipe = await Recipe.create({
		title,
		summary,
		healthScore,
		steps,
		image,
	});
	await recipe.addDiet(diets);
	res.send("Ok");
};

module.exports = { getRecipeHandler, getRecipesHandler, postRecipeHandler };