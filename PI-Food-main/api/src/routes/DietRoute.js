const { Router } = require("express");
const {getDietHandler} = require ("../controllers and handlers/DietHandler")
const DietRouter = Router()

DietRouter.get("/", getDietsHand)

module.exports = DietRouter;