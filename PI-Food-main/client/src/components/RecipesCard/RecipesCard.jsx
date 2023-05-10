import React from "react";
import styles from "./RecipesCard.module.css";
import { Link } from "react-router-dom";

export default function RecipesCard(props) {
	return (
		<Link to={`/recipes/${props.id}`} className={styles.cardButton}>
			<div className={styles.recipesCard} key={props.id}>
				<div className={styles.containerImg}>
					<img src={props.image} alt="" />
				</div>
				<div className={styles.cardInfo}>
					<h2>{props.title}</h2>
					<div>
						<p className={styles.healthScore}>
							HealthScore: {props.healthScore}
						</p>
					</div>

					<div className={styles.dietsContainer}>
						<p id={styles.dietas}>
							{props.diets.map((y) => (
								<span className={styles.span}>{y}</span>
							))}
						</p>
					</div>
				</div>
			</div>
		</Link>
	);
}