const authRouter = require("express").Router();
const bodyValidator = require("../middleware/auth.validator");
const authCltr = require("./auth.controller");
const UserRegisterationDTO = require("./auth.validator");

authRouter.post("/register",bodyValidator(UserRegisterationDTO),authCltr.register);

module.exports = authRouter;