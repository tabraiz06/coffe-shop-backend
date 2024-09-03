// routes/orderRoutes.js
const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

// Create a new order
router.post("/create", async (req, res) => {
  try {
    const { name, email, phone, address, product, totalAmount } = req.body;
    const newOrder = new Order({
      name,
      email,
      phone,
      address,
      product,
      totalAmount,
      paymentStatus: "Pending",
    });
    await newOrder.save();
    res
      .status(201)
      .json({ message: "Order created successfully", orderId: newOrder._id });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;
