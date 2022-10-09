const { User } = require("../../models/user.js");
const { requestError, sendMail } = require("../../helpers");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { nanoid } = require("nanoid");
const { BASE_URL } = process.env;

const register = async (req, res) => {
  const { email, subscription, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw requestError(409, "Email is use");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const verifycationToken = nanoid();
  const result = await User.create({
    email,
    subscription,
    password: hashPassword,
    avatarURL,
    verifycationToken,
  });

  const mail = {
    to: email,
    subject: "Подтверждение регистрации",
    html: `<a href="${BASE_URL}/api/users/verify/${verifycationToken}" target="_blank">Нажмите для подтверждения</a>`,
  };
  await sendMail(mail);

  res.status(201).json({
    email: result.email,
    subscription: result.subscription,
    verifycationToken: result.verifycationToken,
  });
};

module.exports = register;
