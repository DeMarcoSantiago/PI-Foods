const { Router } = require('express');
const DietRouter = require("./DietRoute");
const RecipeRouter = require('./RecipeRoute');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

router.use("/diets", DietRouter)
router.use("/recipes", RecipeRouter)
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);



module.exports = router;
 