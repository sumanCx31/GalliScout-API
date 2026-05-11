const authRouter = require("../auth/auth.router");
const bannerRouter = require("../banner/banner.router");
const propertyRouter = require("../property/property.router");

const router = require("express").Router();

router.get("", (req ,res)=> {
  res.end("hello world!!");
});

router.use("/auth",authRouter);
router.use("/banner", bannerRouter);
router.use("/property", propertyRouter);

module.exports = router;
