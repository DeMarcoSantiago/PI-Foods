const { Router } = require("express");
const {getDietsHandler}  = require("../controllers/DietController");

const dietsRouter = Router();

dietsRouter.get("/", getDietsHandler);

module.exports = dietsRouter;