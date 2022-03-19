const express = require("express");
const cartController = require("../controllers/cartController");
const userController = require("../controllers/userController");

const router = express.Router({ mergeParams: true });

router.use(userController.protect);
router.patch("/", cartController.updateQuantity);

router.route("/create").post(cartController.createCart);
router.route("/").post(cartController.addToCart);

router.route("/myCart").get(cartController.getCart);

module.exports = router;