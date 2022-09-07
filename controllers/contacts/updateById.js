const contacts = require("../../models/contacts");
const { requestError } = require("../../helpers");

const updateById = async (req, res) => {
  const { id } = req.params;
  const result = await contacts.updateContactById(id, req.body);
  if (!result) {
    throw requestError(404, "Not found");
  }
  res.json(result);
};

module.exports = updateById;
