const sharp = require("sharp");
const { cloudinary } = require("../utils/cloudinary");
const Product = require("../Models/productModel");

exports.addProduct = async (req, res, next) => {
  if (!req.files.image) return next();

  req.body.image = `product--${Date.now()}-image.jpeg`;
  try {
    // console.log(req.files);
    await sharp(req.files.image.data)
      .resize(500, 500)
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toFile(`public/img/products/${req.body.image}`);

    const fileStr = `public/img/products/${req.body.image}`;

    const uploadedResponse = await cloudinary.uploader
      .upload(fileStr)
      .then(async (r) => {
        const doc = await Product.create({
          name: req.body.name,
          description: req.body.description,
          price: req.body.price,
          quantity: req.body.quantity,
          image: `https://res.cloudinary.com/dzrmunwn7/image/upload/v${r.version}/${r.public_id}.jpg`,
        });

        res.status(200).json(doc);
      });
  } catch (e) {
    res.json(e);
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const doc = await Product.find();
    res.status(200).json(doc);
  } catch (e) {
    res.json(e);
  }
};
