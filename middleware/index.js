const validateBody = require("../middleware/validateBody");
const authenticate = require("../middleware/authenticate");
const isValidId = require("../middleware/isValidId");

module.exports = {
  validateBody,
  authenticate,
  isValidId,
};
