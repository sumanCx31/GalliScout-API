const bannerCtrl = require('./banner.controller');
const  bodyValidator  = require('../middleware/auth.validator');
const { CreateBannerDTO } = require('./banner.validator');
const uploader = require('../middleware/uploader.middleware');

const bannerRouter = require('express').Router();

bannerRouter.post("/",uploader().single("image"),bodyValidator(CreateBannerDTO), bannerCtrl.createBanner);
bannerRouter.get("/", bannerCtrl.getAllBanner);
bannerRouter.get('/:id', bannerCtrl.getBannerById);
bannerRouter.put('/:id',uploader().single('image'), bodyValidator(CreateBannerDTO), bannerCtrl.updateBanner)
bannerRouter.delete("/:id", bannerCtrl.deleteBannerById);

module.exports = bannerRouter;