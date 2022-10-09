const { User } = require("../../models/user");
const { requestError } = require("../../helpers");

const verifyEmail = async (req, res) => {
  const { verifycationToken } = req.params;
  const user = await User.findOne({ verifycationToken });
  if (!user) {
    throw requestError(404, "Not found");
  }
  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verifycationToken: null,
  });
  res.json({
    message: "Verification successful",
  });
};

module.exports = verifyEmail;
