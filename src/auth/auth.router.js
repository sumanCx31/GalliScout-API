const authRouter = require("express").Router();
const authCltr = require("./auth.controller");

authRouter.post("/register",authCltr.register);

module.exports = authRouter;