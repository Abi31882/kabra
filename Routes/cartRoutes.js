const express = require("express");
const cartController = require("../Controllers/cartController");
const userController = require("../Controllers/userController");

const router = express.Router({ mergeParams: true });

router.use(userController.protect());
router.patch("/", cartController.updateQuantity());

router.route("/create").post(cartController.createCart());
router.route("/").post(cartController.addToCart());

router.route("/myCart").get(cartController.getCart());

module.exports = router;
