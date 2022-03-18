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
  const { name, image, price, quantity } = req.body;

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
  const doc = await Cart.find({ user: req.user.id });
  console.log(req.user.id);
  // const g = await Cart.find();
  // console.log(g);
  // const filter = g.find((e) => e.user === req.user.id);
  console.log(doc);
  // console.log(filter);

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
  // const id = doc.id;
  // console.log(id);
  // const product = await doc.product.filter(
  //   (el) => el.quantity === req.body.quantity
  // );
  // const cartProducts = await doc.product.find(
  //   (e) => (e.id = req.params.productId)
  // );
  // cartProducts.quantity = req.body.quantity;

  // product.quantity = req.body.quantity;
  const cartProducts = await doc.product.map((e) =>
    e.id === req.params.productId ? { ...e, quantity: req.body.quantity } : e
  );
  console.log(cartProducts);

  await doc.save();

  res.status(200).json({
    status: "success",
    cart: cartProducts,
  });
};
