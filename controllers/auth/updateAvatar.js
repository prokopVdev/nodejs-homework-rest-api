const fs = require("fs/promises");
const path = require("path");
const Jimp = require("jimp");
const { requestError } = require("../../helpers");
const { User } = require("../../models/user");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res) => {
  const { path: tempUpload, originalname } = req.file;
  const { _id } = req.user;
  const extension = originalname.split(".").pop();
  const filename = `${_id}.${extension}`;
  const resultUpload = path.join(avatarsDir, filename);
  await fs.rename(tempUpload, resultUpload);
  const avatarURL = path.join("avatars", filename);
  Jimp.read(`public/${avatarURL}`, (err, avatar) => {
    if (err) throw err;
    avatar.resize(250, 250).write(`public/${avatarURL}`);
  });
  await User.findByIdAndUpdate(_id, { avatarURL });
  res.json({
    avatarURL,
  });
};

module.exports = updateAvatar;
