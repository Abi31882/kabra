const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    product: [
      {
        id: String,
        name: String,
        price: Number,
        quantity: Number,
        image: String,
      },
    ],
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      unique: true,
      required: [true, "cart must belong to a user"],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// cartSchema.pre(/^find/, function (next) {
//   this.populate({
//     path: "product",
//   });

//   next();
// });

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
