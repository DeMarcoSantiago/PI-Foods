import axios from "axios";

export const GET_ALL_RECIPES = "GET_ALL_RECIPES";
export const GET_RECIPE_BY_NAME = "GET_RECIPE_BY_NAME";
export const GET_PAGE = "GET_PAGE";
export const SORT = "SORT";
export const GET_RECIPES_DETAIL = "GET_RECIPES_DETAIL";
export const POST_RECIPE = "POST_RECIPE";
export const GET_DIETS = "GET_DIETS";
export const FILTER_DIET = "FILTER_DIET";

export const getAllRecipes = () => async (dispatch) => {
	await axios.get("https://pi-foods-webserver.onrender.com/recipes").then((response) => {
		dispatch({
			type: GET_ALL_RECIPES,
			payload: response.data,
		});
	});
};

export const getRecipeByName = (name) => async (dispatch) => {

	await axios
		.get(`https://pi-foods-webserver.onrender.com/recipes?name=${name}`)
		.then((response) => {
			dispatch({
				type: GET_RECIPE_BY_NAME,
				payload: { data: response.data, name },
			});
		});
};

export function getPage(pages) {
	return async function (dispatch) {
		dispatch({
			type: GET_PAGE,
			payload: pages,
		});
	};
}

export function sort(orden) {
	return async function (dispatch) {
		dispatch({
			type: SORT,
			payload: orden,
		});
	};
}

export const getRecipesDetail = (id) => async (dispatch) => {
	await axios
		.get(`https://pi-foods-webserver.onrender.com/recipes/${id}`)
		.then((response) =>
			dispatch({
				type: GET_RECIPES_DETAIL,
				payload: response.data,
			})
		)
		.catch((e) => console.error(e));
};

export const getDiets = () => async (dispatch) => {
	await axios.get("https://pi-foods-webserver.onrender.com/diets").then((response) => {
		dispatch({
			type: GET_DIETS,
			payload: response.data,
		});
	});
};

export function filterdiet(dieta) {
	return async function (dispatch) {
		dispatch({
			type: FILTER_DIET,
			payload: dieta,
		});
	};
}