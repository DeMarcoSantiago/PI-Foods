import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../redux/actions/actions";
import styles from "./Formulario.module.css";


export default function Formulario() {
	const dispatch = useDispatch();
	const diets = useSelector((state) => state.dietTypes.data);

	useEffect(() => {
		if (!diets.length) {
			dispatch(actions.getDiets());
		}
	}, []);

	const [form, setForm] = useState({
		title: "",
		summary: "",
		healthscore: "",
		steps: "",
		image: "",
		diets: [],
	});

	const [errors, setErrores] = useState({
		title: "",
		summary: "",
		healthscore: "",
		steps: "",
		image: "",
		count: 0,
	});

	const changeHandler = (e) => {
		const property = e.target.name;
		const value = e.target.value;
		if (property != "diets") {
			validate({ ...form, [property]: value });
			setForm({ ...form, [property]: value });
			return;
		}
		if (e.target.checked) {
			setForm({ ...form, diets: [...form.diets, parseInt(value)] });
		} else {
			setForm({
				...form,
				diets: form.diets.filter((x) => x !== parseInt(value)),
			});
		}
	};

	const validate = (form) => {
		let variable = 0;
		if (/^[\s\S]{3,50}$/.test(form.title)) {
			setErrores({ ...errors, title: "", count: 0 });
			variable = variable > 0 ? variable-- : 0;
		} else {
			setErrores({
				...errors,
				title: "No se puede ingresar un campo vacio",
				count: 1,
			});
			variable++;
		}

		if (/^[\s\S]{3,50}$/.test(form.summary)) {
			setErrores({ ...errors, summary: "", count: 0 });
			variable = variable > 0 ? variable-- : 0;
		} else {
			setErrores({
				...errors,
				summary: "No se puede ingresar un campo vacio",
				count: 1,
			});
			variable++;
		}

		if (/^[\s\S]{3,50}$/.test(form.steps)) {
			setErrores({ ...errors, steps: "", count: 0 });
			variable = variable > 0 ? variable-- : 0;
		} else {
			setErrores({
				...errors,
				steps: "No se puede ingresar un campo vacio",
				count: 1,
			});
			variable++;
		}

		if (/^0*(?:[1-9][0-9]?|100)$/.test(form.healthscore)) {
			setErrores({ ...errors, healthscore: "" });
			variable = variable > 0 ? variable-- : 0;
		} else {
			setErrores({ ...errors, healthscore: "Ingresa un numero entre 0 y 100" });
			variable++;
		}

		setErrores({ ...errors, count: variable });
	};

	function submitHandler(e) {
		e.preventDefault();
		axios.post("https://pi-foods-webserver.onrender.com/recipes", form).then((res) => alert(res));
	}

	return (
		<div className={styles.formSection}>
			<div className={styles.formHeader}>
				<h2>Creá una nueva receta</h2>
			</div>
			<div className={styles.formContainer}>
				<form onSubmit={submitHandler} className={styles.formulario}>
					<div className={styles.inputName}>
						<label className={styles.inputTitle}>Nombre de la receta</label>
						<input
							type="text"
							value={form.title}
							name="title"
							onChange={changeHandler}
						/>
						{errors.title && <span>{errors.title}</span>}
					</div>
					<div className={styles.inputResumen}>
						<label className={styles.inputTitle}>Resumen</label>
						<textarea
							type=""
							value={form.summary}
							name="summary"
							onChange={changeHandler}
						/>
					</div>
					<div className={styles.inputName}>
						<label className={styles.inputTitle}>
							Nivel de comida saludable
						</label>
						<input
							type="number"
							value={form.healthscore}
							name="healthscore"
							onChange={changeHandler}
						/>
						{errors.healthscore && <span>{errors.healthscore}</span>}
					</div>
					<div className={styles.inputPasos}>
						<label className={styles.inputTitle}>Pasos</label>
						<input
							type="text"
							value={form.steps}
							name="steps"
							onChange={changeHandler}
						/>
					</div>
					<div className={styles.inputDietas}>
						<label className={styles.inputTitle}>Dietas</label>
						{diets.map((x) => {
							return (
								<div key={x.id}>
									<label htmlFor="">
										<input
											className={styles.inputCheck}
											type="checkbox"
											onChange={changeHandler}
											name="diets"
											value={x.id}
										/>
										{x.name}
									</label>
								</div>
							);
						})}
					</div>

					{!errors.count && form.title.length && form.healthscore.length ? (
						<button type="submit" className={styles.buttonForm}>
							Enviar
						</button>
					) : (
						<button type="submit" className={styles.buttonForm} disabled>
							Enviar
						</button>
					)}
				</form>
			</div>
		</div>
	);
}