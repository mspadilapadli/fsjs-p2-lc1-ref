const express = require("express");
const router = express.Router();
const Controller = require("../controllers/controller");
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");

router.post("/register", Controller.register);
router.post("/login", Controller.login);

router.use(authentication);

router.get("/vouchers", Controller.getVouchers);
router.post("/gifts/:voucherId", Controller.postGiftVoucherId);
router.get("/gifts", Controller.getGifts);

router.patch("/gifts/:id/claim", authorization, Controller.patchGiftsClaim);
router.delete("/gifts/:id", authorization, Controller.deleteGift);

module.exports = router;
