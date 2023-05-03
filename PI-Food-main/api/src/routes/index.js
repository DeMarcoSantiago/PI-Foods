const { Router } = require('express');
const DietRouter = require("./DietRoute");
const RecipeRouter = require('./RecipeRoute');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

router.use("/Diets", DietRouter)
router.use("/Recipes", RecipeRouter)
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);



module.exports = router;
 