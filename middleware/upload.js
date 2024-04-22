const multer = require("multer");
const path = require("path");
const { nanoid } = require("nanoid");

//=====================
// const tempDir = path.join(__dirname, "../", "temp");
// console.log(tempDir);
// const multerConfig = multer.diskStorage({
//   destination: tempDir,
//   filename: (req, file, cb) => {
//     cb(null, file.originalname);
//   },
// });

// const upload = multer({
//   storage: multerConfig,
// });
//============

const multerConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../", "tmp"));
  },
  filename: (req, file, cb) => {
    const extension = file.mimetype.split("/")[1];
    cb(null, `${req.user.id}-${nanoid(5)}.${extension}`);
  },
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new HttpError(400, "Please, upload images only.."), false);
  }
};

const MB_SIZE = 1024 * 1024;
const upload = multer({
  storage: multerConfig,
  fileFilter: multerFilter,
  limits: {
    fieldSize: 2 * MB_SIZE,
  },
});

module.exports = upload;
