const { MyHttpError } = require("./myHttpError");

const myValidateBody = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(MyHttpError(400, error.message));
    }
    next();
  };
  return func;
};

module.exports = myValidateBody;
