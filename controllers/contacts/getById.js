const { Contact } = require("../../models/contact");
const { requestError } = require("../../helpers");

const getById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findById(id, "-createdAt -updatedAt");
  if (!result) {
    throw requestError(404, "Not found");
  }
  res.json(result);
};

module.exports = getById;
