import React, { useEffect } from "react";
import styles from "./RecipeDetail.module.css";
import * as actions from "../../redux/actions/actions";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

export default function RecipeDetail() {
	const dispatch = useDispatch();
	const { id } = useParams();

	const recipesDetail = useSelector((state) => state.recipeDetail.data);

	useEffect(() => {
		dispatch(actions.getRecipesDetail(id));
	}, [dispatch]);

	console.log(recipesDetail);

	function removeTags(str) {
		if (str === null || str === "") return false;
		else str = str.toString();

		return str.replace(/(<([^>]+)>)/gi, "");
	}

	return (
		<div className={styles.detailSection}>
			<div className={styles.overlay}>
			</div>


			<div className={styles.detailHeader}>
				<h2>{recipesDetail.title}</h2>
			</div>

			<div className={styles.recipeDetail}>
				<Link to="/home" className={styles.btn}>
					<i class="bx bxs-chevron-left"></i>Volver
				</Link>
				<div>
					<div className={styles.infoContainer}>
						<p>{recipesDetail.summary && removeTags(recipesDetail.summary)}</p>
						<p>Nivel de comida saludable: {recipesDetail.healtscore}</p>
					</div>
					<div className={styles.imgContainer}>
						<img src={recipesDetail.image} alt="" />
					</div>
				</div>
				<h2>Pasos:</h2>
				<div className={styles.listSteps}>
					<ul>
						{recipesDetail.steps &&
							recipesDetail.steps.map((x) => (
								<li>
									{x.number}: {x.step}
								</li>
							))}
					</ul>
				</div>
			</div>
		</div>
	);
}