const authRouter = require("../auth/auth.router");
const bannerRouter = require("../banner/banner.router");

const router = require("express").Router();

router.get("", (req ,res)=> {
  res.end("hello world!!");
});

router.use("/auth",authRouter);
router.use("/banner", bannerRouter);

module.exports = router;
