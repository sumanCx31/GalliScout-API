const authRouter = require("express").Router();
const bodyValidator = require("../middleware/auth.validator");
const uploader = require("../middleware/uploader.middleware");
const authCltr = require("./auth.controller");
const UserRegisterationDTO = require("./auth.validator");

authRouter.post("/register", uploader().single("image"), bodyValidator(UserRegisterationDTO), authCltr.register);


module.exports = authRouter;