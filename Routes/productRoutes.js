const express = require("express");
const ProductController = require("../Controllers/productcontroller");

const router = express.Router();

router.post("/create", ProductController.addProduct);

module.exports = router;
