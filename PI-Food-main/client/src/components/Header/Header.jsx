import React from "react";
import { Link, useLocation } from "react-router-dom";
import Navbar from "../NavBar/NavBar";
import styles from "./Header.module.css";

export default function Header() {
	const location = useLocation();
	return (
		<header className={styles.header}>
			<div className="container">
				<Link to="/home" className={styles.tituloHeader}>
					<h1>
						HENRY <span>FOOD</span>
					</h1>
				</Link>
				{location.pathname !== "/" && <Navbar />}
			</div>
		</header>
	);
}