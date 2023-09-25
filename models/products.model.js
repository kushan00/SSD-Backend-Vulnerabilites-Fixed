const mongoose = require("mongoose");

const product = mongoose.model(
  "products",
  mongoose.Schema(
    {
      category: String,
      productName: String,
      productPrice: Number,
      expireDate:Date,
      quantity:Number,
      productImage: String
    },
    { timestamps: true }
  )
);

module.exports = {
  product,
};
