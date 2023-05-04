const { Router } = require("express");
const { getRecipeHandler, getRecipesHandler, postRecipeHandler } = require("../controllers and handlers/RecipeHandler")
  
const RecipeRouter = Router()


RecipeRouter.get("/", getRecipesHandler);

RecipeRouter.get("/:id", getRecipeHandler);

RecipeRouter.get("/?name", getRecipesHandler);

RecipeRouter.post("/", postRecipeHandler);


module.exports = RecipeRouter;