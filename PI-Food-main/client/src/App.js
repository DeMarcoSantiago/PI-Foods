import "./App.css";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Landing from "./components/Landing/Landing";
import Home from "./components/Home/Home";
import RecipeDetail from "./components/RecipeDetail/RecipeDetail";
import Formulario from "./components/Formulario/Formulario";

function App() {
	return (
		<div className="App">
			<Header />
			<Routes>
				<Route path="" element={<Landing />} />
				<Route path="/home" element={<Home />} />
				<Route path="/recipes/:id" element={<RecipeDetail />} />
				<Route path="/formulario" element={<Formulario />} />
			</Routes>
		</div>
	);
}

export default App;