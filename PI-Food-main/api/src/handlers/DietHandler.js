const { getDietsTypesDb } = require("../controllers/DietController");

const getDietsHandler = async (req, res) => {
  res.send(await getDietsTypesDb());
};

module.exports = { getDietsHandler };