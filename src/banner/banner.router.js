const bannerClrt = require("./banner.controller");

const bannerRouter = require("express").Router();

bannerRouter.post("/add", bannerClrt.addBanner);


module.exports = bannerRouter;