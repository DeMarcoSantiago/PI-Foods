const { getDietsTypesDb } = require("./DietController");

const getDietsHandler = async (req, res) => {
  res.send(await getDietsTypesDb());
};

module.exports = { getDietsHandler };