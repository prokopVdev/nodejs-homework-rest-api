const { User } = require("../../models/user");
const { requestError, sendMail } = require("../../helpers");
const { BASE_URL } = process.env;

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  if (!email) throw requestError(400, "missing required field email");
  const user = await User.findOne({ email });
  if (!user) throw requestError(404, "Not found");
  if (user.verify)
    throw requestError(400, "Verification has already been passed");
  const mail = {
    to: email,
    subject: "Подтверждение регистрации",
    html: `<a href="${BASE_URL}/api/users/verify/${user.verifycationToken}" target="_blank">Нажмите для подтверждения</a>`,
  };
  await sendMail(mail);
  res.json({
    message: "Verification email sent",
  });
};

module.exports = resendVerifyEmail;
