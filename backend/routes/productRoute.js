const express = require("express");
const Product = require("../model/productModel");
const router = express.Router();

router.post("/addproduct", async (req, res) => {
  try {
    const pro = new Product({
      name: req.body.name,
      category: req.body.category,
      qty: req.body.qty,
      price: req.body.price,
      des: req.body.des,
      img: req.body.img,
    });
    const newProduct = await pro.save();

    res.send(newProduct);
  } catch (err) {
    res.send({ message: err.message });
  }
});

router.get("/productlist", async (req, res) => {
  try {
    const products = await Product.find({});
    res.send(products);
  } catch (err) {
    res.send({ message: err.message });
  }
});

router.get("/productlist/:_id", async (req, res) => {
  try {
    const product = await Product.findById(req.params._id);
    res.send(product);
  } catch (err) {
    res.send({ message: err.message });
  }
});

router.delete("/productlist/:_id", async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params._id);
    res.send(product);
  } catch (err) {
    res.send({ message: err.message });
  }
});

router.patch("/productlist/:_id", async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params._id,
      {
        name: req.body.name,
        category: req.body.category,
        img: req.body.img,
        qty: req.body.qty,
        price: req.body.price,
        des: req.body.des,
      },
      (err, product) => {
        if (err) {
          res.send({ message: err.message });
        }
        res.send(product);
      }
    );
  } catch (err) {
    res.send({ message: err.message });
  }
});

module.exports = router;
