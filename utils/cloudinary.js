const dotenv = require("dotenv");
dotenv.config({ path: "../config.env" });
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  //   cloud_name: process.env.CLOUDINARY_NAME,
  //   api_key: process.env.CLOUDINARY_API_KEY,
  //   api_secret: process.env.CLOUDINARY_API_SECRET,
  cloud_name: "dzrmunwn7",
  api_key: "671841619634652",
  api_secret: "PoatHbKHXddKBdr_UZCv_-LrRqI",
});

module.exports = { cloudinary };
