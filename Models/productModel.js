const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A product must have a name"],
      trim: true,
      maxlength: [
        60,
        "A product's name can have less or equal to 40 characters",
      ],
      minlength: [
        2,
        "A product must have greater than or equal to 2 characters",
      ],
    },

    price: {
      type: Number,
      required: [true, "A product must have a price"],
    },

    quantity: {
      type: Number,
      default: 1,
    },
    description: {
      type: String,
      trim: true,
      required: [true, "A product must have a description"],
    },
    image: {
      type: String,
    },

    version: {
      type: String,
    },
    public_id: {
      type: String,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual populate
// productSchema.virtual('reviews', {
//   ref: 'Review',
//   foreignField: 'product',
//   localField: '_id',
// });

// Document Middlewares
// productSchema.pre("save", function (next) {
//   this.slug = slugify(this.name, { lower: true });
//   next();
// });

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
// export default Product;
