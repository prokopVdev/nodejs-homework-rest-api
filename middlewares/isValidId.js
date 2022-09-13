const { isValidObjectId } = require("mongoose");
const { requestError } = require("../helpers");

const isValidId = (req, res, next) => {
  if (!isValidObjectId(req.params.id)) {
    next(requestError(404, "Not found"));
  }
  next();
};

module.exports = isValidId;
