const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CartSchema = new Schema({
  userID: {
    type: String,
    required: true,
  },
  productImage: {
    type: String,
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },
 
  productPrice: {
    type: Number,
    required: true,
  },
  itemID: {
    type: String,
    required: true,
  },
  

});

module.exports = mongoose.model("Cart", CartSchema);
