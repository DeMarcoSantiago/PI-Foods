import React, { useEffect, useState } from "react";
import styles from "./RecipeContainer.module.css";
import * as actions from "../../redux/actions/actions";
import { useSelector, useDispatch } from "react-redux";

import RecipesCard from "../RecipesCard/RecipesCard";

export default function RecipesContainer() {
	const dispatch = useDispatch();

	const activeName = useSelector((state) => state.recipes.activeName);

	const currentFilter = useSelector((state) => state.recipes.activeFilter);

	const stateSort = useSelector((state) => state.recipes.activeSort);

	const diets = useSelector((state) => state.dietTypes.data);

	const pagination = useSelector((state) => state.recipes.pagination);

	const [pageView, setPageView] = useState([]);

	const [nameSearch, setNameSearch] = useState("");

	const recipesApi = useSelector((state) => state.recipes.filterData);

	useEffect(() => {
		dispatch(actions.getAllRecipes());
		dispatch(actions.getDiets());
	}, [dispatch]);

	useEffect(() => {
		let min;
		let max;

		if (pagination.max.length === 1) {
			setPageView(recipesApi);
		} else {
			max = pagination.currentPage * pagination.pageLength;
			min = max - pagination.pageLength;
			setPageView(recipesApi.slice(min, max));
		}
	}, [recipesApi]);

	useEffect(() => {
		let min;
		let max;

		if (pagination.max.length === 1) {
			setPageView(recipesApi);
		} else {
			max = pagination.currentPage * pagination.pageLength;
			min = max - pagination.pageLength;
			setPageView(recipesApi.slice(min, max));
		}
	}, [pagination.currentPage]);

	useEffect(() => {
		setNameSearch(activeName);
	}, [activeName]);

	function handlerFilter(dieta) {
		dispatch(actions.filterdiet(dieta));
	}

	function handlerOrden(orden) {
		dispatch(actions.sort(orden));
	}

	function changeHandlerPage(page) {
		dispatch(actions.getPage(page));
	}

	function changeHandlerName(e) {
		setNameSearch(e.target.value);
	}

	function getRecipeName(name) {
		console.log(name);
		dispatch(actions.getRecipeByName(name));
	}

	return (
		<div className={styles.recipesSection}>
			<div className={styles.overlay}></div>
			<div className={styles.headerContainer}>
				<div className={styles.selectsContainer}>
					<div>
						<p>Ordenar por:</p>
						<div className={styles.sortContainer}>
							<select
								name=""
								id=""
								onChange={(e) => {
									handlerOrden(e.target.value);
								}}
							>
								<option value="default" selected={stateSort === "default"}>
									Inicio
								</option>
								<option value="a-z" selected={stateSort === "a-z"}>
									A-z
								</option>
								<option value="z-a" selected={stateSort === "z-a"}>
									Z-a
								</option>
								<option
									value="menor-mayor"
									selected={stateSort === "menor-mayor"}
								>
									de Menor a Mayor
								</option>
								<option
									value="mayor-menor"
									selected={stateSort === "mayor-menor"}
								>
									de Mayor a Menor
								</option>
							</select>
						</div>
					</div>
					<div>
						<p>Filtrar por dieta:</p>
						<div className={styles.selectContainer}>
							<select
								name=""
								id=""
								onChange={(e) => {
									handlerFilter(e.target.value);
								}}
							>
								<option
									selected={currentFilter === "default"}
									value={"default"}
								>
									Todas
								</option>
								{diets.map((x) => (
									<option
										selected={currentFilter === x.name}
										value={x.name}
										key={x.id}
									>
										{x.name}
									</option>
								))}
							</select>
						</div>
					</div>
					<div>
						<p>Buscar:</p>
						<div className={styles.searchContainer}>
							<i className="bx bx-search"></i>
							<form
								action=""
								onSubmit={(e) => {
									e.preventDefault();
									getRecipeName(nameSearch);
								}}
							>
								<input
									type="text"
									onChange={changeHandlerName}
									className={styles.inputSearch}
									value={nameSearch}
								/>
								<input type="submit" className={styles.inputBtn} />
							</form>
						</div>
					</div>
				</div>

				<div className={styles.pageBtnContainer}>
					{pagination.max.map((x) => (
						<button
							key={x}
							onClick={() => {
								changeHandlerPage(x);
							}}
							className={
								x === pagination.currentPage
									? `${styles.btn} ${styles.btnPage}`
									: `${styles.btn}`
							}
						>
							{x}
						</button>
					))}
				</div>
			</div>

			<div className={styles.recipesContainer}>
				{pageView.length ? (
					pageView.map((x) => (
						<RecipesCard
							title={x.title}
							image={x.image}
							id={x.id}
							key={x.title}
							diets={x.diets}
							healthScore={x.healthScore}
						/>
					))
				) : (
					<p>Loading</p>
				)}
			</div>
		</div>
	);
}