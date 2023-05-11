import React from "react";
import henry from "../../image/henry.png";
import profile from "../../image/profile.jpeg";

import { Link } from "react-router-dom";
import styles from "./Landing.module.css";

export default function Landing() {
	return (
		<div className={styles.landing}>
			<div className={styles.container}>
				<h2>
					Tasty and <br />
					Beautiful Recipes
				</h2>
				<p>
					Proyecto individual realizado para <img src={henry} alt="" />
				</p>
				<div className={styles.firma}>
					<img src={profile} alt="" />
					<span>By Santiago De Marco</span>
				</div>
				<Link to="/home" className={styles.link}>
					Ingresar
				</Link>
			</div>
		</div>
	);
}