const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  customerId: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  items: {
    type: [
      {
        name: { type: String, required: true },
        category: { type: String, required: true },
        qty: { type: String, required: true },
        price: { type: Number, required: true },
        des: { type: String, required: true },
        img: { type: String, required: true },
      },
    ],
  },
});

const orderModel = mongoose.model("order", orderSchema);

module.exports = orderModel;
