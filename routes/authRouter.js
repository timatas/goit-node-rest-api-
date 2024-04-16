const express = require("express");

const ctrl = require("../controllers/authControllers");

const { validateBody, authenticate } = require("../middleware");

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

module.exports = authRouter;
