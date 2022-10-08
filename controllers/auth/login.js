const { User } = require("../../models/user.js");
const { requestError } = require("../../helpers");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw requestError(401, "Email not found");
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw requestError(401, "Wrong password");
  }
  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
  const result = await User.findByIdAndUpdate(user._id, { token });
  res.json({
    token,
    user: { email: result.email, subscription: result.subscription },
  });
};

module.exports = login;
