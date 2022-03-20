const express = require("express");
const cartController = require("../controllers/cartController.js");
const userController = require("../controllers/userController.js");

const router = express.Router({ mergeParams: true });

router.use(userController.protect);
router.patch("/", cartController.updateQuantity);

router.route("/create").post(cartController.createCart);
router.route("/").post(cartController.addToCart);

router.route("/myCart").get(cartController.getCart);

module.exports = router;
