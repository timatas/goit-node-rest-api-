const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const gravatar = require("gravatar");
const Jimp = require("jimp");
const path = require("path");
const fs = require("fs/promises");

const { User } = require("../models/userModel");

const { HttpError, ctrlWrapper } = require("../helpers");

const { SECRET_KEY } = process.env;

const avatarsDir = path.join(__dirname, "../", "public", "avatars");

const register = async (req, res) => {
  const { email, password } = req.body;

  const newUser = await User.findOne({ email });
  if (newUser) {
    throw HttpError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  /*const avatarURL = gravatar.url(email);*/
  const emailHash = crypto.createHash("md5").update(email).digest("hex");
  const avatarURL = `https://gravatar.com/avatar/${emailHash}.jpg?d=wavatar`;

  const user = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
  });

  res.status(201).json({ user: { email, password } });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password invalid");
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  await User.findByIdAndUpdate(user._id, { token });

  res.json({ token, user: { email, subscription: user.subscription } });
};

const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;

  res.json({
    email,
    subscription,
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: null });

  res.status(204).send();
};

//=======
const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tempUpload, filename } = req.file;
  const resultUpload = path.join(avatarsDir, filename);

  await fs.rename(tempUpload, resultUpload);

  const image = await Jimp.read(resultUpload);
  await image.resize(250, 250).writeAsync(resultUpload);

  const avatarURL = path.join("avatars", filename);
  await User.findByIdAndUpdate(_id, { avatarURL });

  res.json({
    avatarURL,
  });
};
//=======
// const updateAvatar = async (req, res) => {
//   const { _id } = req.user;
//   if (req.file) {
//     const { path: tempUpload, originalname } = req.file;
//     const resultUpload = path.join(avatarsDir, originalname);
//     await fs.rename(tempUpload, resultUpload);
//     const avatarURL = path.join("avatars", originalname);
//     await User.findByIdAndUpdate(_id, { avatarURL });

//     res.json({
//       avatarURL,
//     });
//   } else {
//     res.status(400).json({ error: "ERROR" });
//   }
// };
//==========
module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
  updateAvatar: ctrlWrapper(updateAvatar),
};
