const { Contact } = require("../../models/contact");
const { requestError } = require("../../helpers");

const deleteById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndDelete(id);
  if (!result) {
    throw requestError(404, "Not found");
  }
  res.json({ message: "contact deleted" });
};

module.exports = deleteById;
