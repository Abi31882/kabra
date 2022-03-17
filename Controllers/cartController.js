const Cart = require("../Models/cartModel");

exports.setCustomerId = (req, res, next) => {
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

exports.createCart = async (req, res, next) => {
  try {
    const doc = await Cart.create(req.body);

    res.status(201).json(doc);
  } catch (e) {
    res.status(400).json(e);
  }
};

exports.addToCart = async (req, res, next) => {
  const { productId } = req.params;

  const doc = await Cart.findById(req.params.cartId);

  if (!doc) {
    return res.json("no cart created");
  }
  const product = doc.product.find((p) => p.id === productId);

  if (product) {
    return res.json("already in the doc", 400);
  }

  doc.product.push(productId);
  await doc.save();
  res.status(200).json({
    status: "success",
    doc,
  });
};

exports.deleteFromCart = async (req, res, next) => {
  const doc = await Cart.findById(req.params.cartId);

  const d = doc.product.filter((i) => i.id !== req.params.productId);

  doc.product = [];
  doc.product = d;
  if (doc.product.length === 0) {
    doc.product = [];
  }
  await doc.save({ validateBeforeSave: false });

  res.status(200).json({
    status: "success",
    doc,
  });
};

exports.getCart = async (req, res, next) => {
  const doc = await Cart.findOne({ user: req.user.id }).exec();

  if (!doc) {
    return res.status(404).json("No Cart found with that ID");
  }

  res.status(200).json({
    status: "success",
    doc,
  });
};

exports.updateQuantity = async (req, res, next) => {
  const doc = await Cart.findById(req.params.cartId);

  if (!doc) {
    return res.json("we could not fild your cart");
  }

  const product = doc.product.find((el) => el.id === req.params.productId);

  if (!product) {
    return res.json(
      "Sorry, there is no such product, please specify correctly"
    );
  }

  if (product) {
    product.quantity = req.body.quantity;

    await doc.save({ validateBeforeSave: false });

    res.status(200).json({
      status: "success",
      cart: doc,
    });
  } else {
    next();
  }
};
