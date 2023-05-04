const { Router } = require("express");
const { getDietsHandler } = require ("../controllers and handlers/DietHandler")
const DietRouter = Router()

DietRouter.get("/", getDietsHandler)

module.exports = DietRouter;