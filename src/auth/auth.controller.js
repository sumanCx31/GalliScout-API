const bcrypt = require("bcryptjs");
const { Status } = require("../config/constants");
const {
  randomStringGenerator,
  randomNumberGenerator,
} = require("../../utilities/helper");
const userSvc = require("../user/user.service");
const cloudinarySvc = require("../services'/cloudinary.service");
const authSvc = require("./auth.service");


class AuthController {
  register = async (req, res) => {
    try {
      const data = req.body;
      const transformedData = await authSvc.transformedData(req,data);

      const user = await userSvc.createUser(transformedData);
      await authSvc.sendActivationNotification(user);
      console.log(user);

      res.json({
        data: data,
        message: "This is register route",
        status: "success",
      });
    } catch (exception) {
      throw exception;
    }
  };
}

const authCltr = new AuthController();
module.exports = authCltr;
