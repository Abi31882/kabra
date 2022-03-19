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
  const { productId, cartId } = req.params;
  const { name, image, price, quantity, productID } = req.body;

  const doc = await Cart.findById(cartId);

  if (!doc) {
    return res.status(400).json("no cart created");
  }
  const product = doc.product.find((p) => p.id === productId);

  if (product) {
    return res
      .status(400)
      .json(
        "this product is already in your cart, Increase the quantity from the carts page",
        400
      );
  }

  doc.product.push({
    name,
    price,
    quantity,
    image,
    productID,
  });

  // doc.product.push(productId);
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
  const id = req.user.id;
  const doc = await Cart.find();
  // console.log(doc);
  const cart = doc.find((el) => el.user == id);
  if (!cart) {
    res.status(404).json("not found");
  }
  res.status(200).json(cart);
};

exports.updateQuantity = async (req, res, next) => {
  const doc = await Cart.find({ user: req.user.id }).then(async (r) => {
    const pr = r.find((p) => (p.product = req.params.productId));
    const cartPr = pr.product.find((e) => e.productID === req.params.productId);
    // await pr.save({ suppressWarning: true });
    cartPr.quantity = req.body.quantity;
    res.status(200).json(r);
  });

  console.log(req.params.productId);
};
