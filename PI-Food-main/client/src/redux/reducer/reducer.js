import {
	GET_ALL_RECIPES,
	SORT,
	GET_RECIPES_DETAIL,
	GET_DIETS,
	FILTER_DIET,
	GET_PAGE,
	GET_RECIPE_BY_NAME,
} from "../actions/actions";

const initialState = {
	recipes: {
		data: [],
		filterData: [],
		activeName: "",
		activeFilter: "default",
		activeSort: "default",
		pagination: { max: [], currentPage: 1, pageLength: 9 },
	},
	recipeDetail: { data: [] },
	dietTypes: { data: [] },
};

function paginador(x, y) {
	const max = Math.ceil(x.length / y);

	const paginas = [];
	for (let i = 1; i <= max; i++) {
		paginas.push(i);
	}
	return paginas;
}

function cualquier2(arr, pay) {
	if (pay !== "default") {
		return arr.filter((x) => x.diets.some((y) => y === pay));
	} else {
		return arr;
	}
}

function configSorts(arr, payload, original) {
	let ordenamiento;
	if (payload === "a-z") {
		ordenamiento = arr.sort(function (x, y) {
			return x.title.localeCompare(y.title);
		});
	} else if (payload === "z-a") {
		ordenamiento = arr.sort((x, y) => y.title.localeCompare(x.title));
	} else if (payload === "menor-mayor") {
		ordenamiento = arr.sort((x, y) => x.healthScore - y.healthScore);
	} else if (payload === "mayor-menor") {
		ordenamiento = arr.sort((x, y) => y.healthScore - x.healthScore);
	} else {
		ordenamiento = original;
	}
	return ordenamiento;
}

function allFilters(arr, name, diet, state, sort) {
	console.log(arr, name, diet, state);

	let finalRes = sort !== "default" ? arr : state.recipes.data;

	const recipesFilters = finalRes.filter((recipe) => {
		console.log("Esto es la recipe: " + recipe);
		const filterByName = name.trim()
			? recipe.title.toLowerCase().trim().includes(name.toLowerCase().trim())
			: true;
		console.log("Esto es la filterByName: " + filterByName);

		const filterByDiet =
			diet !== "default" ? recipe.diets.includes(diet) : true;
		console.log("Esto es la filterByDiet: " + filterByDiet);

		return filterByName && filterByDiet;
	});

	const resConfig = configSorts(
		recipesFilters,
		sort ? sort : state.recipes.activeSort,
		recipesFilters
	);

	console.log("Sort " + resConfig);
	return resConfig;
}

function filterName(arr, name) {
	console.log(`este es el arr del Name: ${arr}`);
	const resName =
		name !== "" ? arr.filter((recipes) => recipes.title.includes(name)) : arr;

	console.log("Este es el res de antes del return  " + resName);
	console.log(name);
	return resName;
}

const rootReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_ALL_RECIPES:
			// const initialSort = configSorts(
			// 	action.payload,
			// 	state.recipes.activeSort,
			// 	action.payload
			// );

			const res = allFilters(
				action.payload,
				state.recipes.activeName,
				state.recipes.activeFilter,
				state
			);

			console.log(res);

			// const newArr = cualquier2(initialSort, state.recipes.activeFilter);

			// const recipesSearch = filterName(newArr, state.recipes.activeName);

			const paginas = paginador(res, state.recipes.pagination.pageLength);

			return {
				...state,
				recipes: {
					...state.recipes,
					data: action.payload,
					filterData: res,
					pagination: { ...state.recipes.pagination, max: paginas },
				},
			};

		case GET_RECIPE_BY_NAME:
			const resAllFilter = allFilters(
				action.payload.data,
				action.payload.name,
				state.recipes.activeFilter,
				state
			);
			const paginas3 = paginador(
				resAllFilter,
				state.recipes.pagination.pageLength
			);

			return {
				...state,
				recipes: {
					...state.recipes,
					data: resAllFilter,
					activeName: action.payload.name,
					filterData: resAllFilter,
					pagination: { ...state.recipes.pagination, max: paginas3 },
				},
			};

		case GET_PAGE:
			return {
				...state,
				recipes: {
					...state.recipes,
					pagination: {
						...state.recipes.pagination,
						currentPage: action.payload,
					},
				},
			};

		case SORT:
			// const resSort = configSorts(
			// 	state.recipes.filterData,
			// 	action.payload,
			// 	state.recipes.data
			// );
			// const newArr4 = cualquier2(resSort, state.recipes.activeFilter);
			const newArr4 = allFilters(
				state.recipes.filterData,
				state.recipes.activeName,
				state.recipes.activeFilter,
				state,
				action.payload
			);
			const paginas4 = paginador(newArr4, state.recipes.pagination.pageLength);

			return {
				...state,
				recipes: {
					...state.recipes,
					filterData: [...newArr4],
					activeSort: action.payload,
					pagination: { ...state.recipes.pagination, max: paginas4 },
				},
			};

		case GET_RECIPES_DETAIL:
			return {
				...state,
				recipeDetail: { ...state.recipeDetail, data: action.payload },
			};

		case GET_DIETS:
			return {
				...state,
				dietTypes: { ...state.dietTypes, data: action.payload },
			};

		case FILTER_DIET:
			const filtro = allFilters(
				state.recipes.data,
				state.recipes.activeName,
				action.payload,
				state
			);

			const paginas2 = paginador(filtro, state.recipes.pagination.pageLength);

			return {
				...state,
				recipes: {
					...state.recipes,
					filterData: filtro,
					pagination: {
						...state.recipes.pagination,
						max: paginas2,
						currentPage: 1,
					},
					activeFilter: action.payload,
				},
			};

		default: {
			return {
				...state,
			};
		}
	}
};

export default rootReducer;