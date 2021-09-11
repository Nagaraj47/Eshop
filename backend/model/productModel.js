const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  qty: { type: String, required: true },
  price: { type: Number, required: true },
  des: { type: String, required: true },
  img: { type: String, required: true },
});

const productModel = mongoose.model("product", productSchema);

module.exports = productModel;
