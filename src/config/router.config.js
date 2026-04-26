const authRouter = require("../auth/auth.router");

const router = require("express").Router();

router.get("", (req ,res)=> {
  res.end("hello world!!");
});

router.use("/auth",authRouter);

module.exports = router;
