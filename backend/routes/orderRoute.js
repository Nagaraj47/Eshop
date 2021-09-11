const express = require("express");
const Order = require("../model/orderModel");
const SendMail = require("../SendMail");
const router = express.Router();

router.post("/addorder", async (req, res) => {
  try {
    const order = new Order({
      customerId: req.body.userId,
      location: req.body.address,
      items: req.body.cartItems,
    });

    const newOrder = await order.save();

    res.send(newOrder);
  } catch (err) {
    res.status(401).send({ msg: err.message });
  }
});

router.get("/orders", async (req, res) => {
  try {
    const orders = await Order.find({});
    res.send(orders);
  } catch (err) {
    res.send({ message: err.message });
  }
});

router.get("/orders/:_id", async (req, res) => {
  try {
    const order = await Order.findById(req.params._id);
    res.send(order);
  } catch (err) {
    res.send({ message: err.message });
  }
});

router.post("/sendmail", async (req, res) => {
  try {
    const toMail = req.body.toMail;
    const Items = req.body.Items;
    SendMail(toMail, Items);
    res.send();
  } catch (err) {
    res.status(401).send({ msg: err.message });
  }
});

module.exports = router;
