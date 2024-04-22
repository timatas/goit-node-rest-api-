const express = require("express");

const ctrl = require("../controllers/authControllers");

const { validateBody, authenticate, upload } = require("../middleware");

const { schemas } = require("../models/userModel");

const authRouter = express.Router();

//user`s registration
authRouter.post(
  "/register",
  validateBody(schemas.registerSchema),
  ctrl.register
);

//user`s login
authRouter.post("/login", validateBody(schemas.loginSchema), ctrl.login);

//current user
authRouter.get("/current", authenticate, ctrl.getCurrent);

//logout
authRouter.post("/logout", authenticate, ctrl.logout);

//upload user`s avatar
authRouter.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  ctrl.updateAvatar
);

module.exports = authRouter;
