const { Router } = require("express");
const { getDietsHandler } = require("../handlers/DietHandler");

const dietsRouter = Router();

dietsRouter.get("/", getDietsHandler);

module.exports = dietsRouter;