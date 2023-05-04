const { Router } = require("express");
const {getDietHandler} = require ("../controllers and handlers/DietHandler")
const DietRouter = Router()

DietRouter.get("/", getDietHandler)

module.exports = DietRouter;