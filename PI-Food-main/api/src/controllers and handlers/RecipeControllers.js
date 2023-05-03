const { API_KEY } = process.env;
const axios = require("axios");
const { Recipe, Diet } = require("../db");
const burgur = require("../img if err accur/burguer.png")

const apiURL = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`)

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
const getApiRecipes = await apiURL.data.results.map(element => {
    return{
        id: element.id,
        image: element.image|| "fallo la imagen",
        DietTypes: element.diets,
        summary: element.summary,
        score: element.spoonacularScore,
        healthScore: element.healthScore,
        dishTypes: element.dishTypes,
        steps: e.analyzedInstructions[0]?.steps.map(eelement => {
            return{
                number: eelement.number,
                step: eelement.step,
            }
        })
    }
})

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

