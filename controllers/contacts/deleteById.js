const contacts = require("../../models/contacts");
const { requestError } = require("../../helpers");

const deleteById = async (req, res) => {
  const { id } = req.params;
  const result = await contacts.removeContact(id);
  if (!result) {
    throw requestError(404, "Not found");
  }
  res.json({ message: "contact deleted" });
};

module.exports = deleteById;
