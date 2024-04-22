const validateBody = require("../middleware/validateBody");
const authenticate = require("../middleware/authenticate");
const isValidId = require("../middleware/isValidId");
const upload = require("./upload");

module.exports = {
  validateBody,
  authenticate,
  isValidId,
  upload,
};
