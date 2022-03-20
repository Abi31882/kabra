const express = require("express");
const ProductController = require("../Controllers/productcontroller");
const cartRouter = require("./cartRoutes");

const router = express.Router({ mergeParams: true });
router.use("/:productId/cart/:cartId", cartRouter());

router.post("/create", ProductController.addProduct());
router.get("/", ProductController.getAllProducts());

module.exports = router;
