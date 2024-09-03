// routes/paymentRoutes.js
const express = require("express");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Order = require("../models/Order");

// Process payment
router.post("/pay", async (req, res) => {
  const { orderId, paymentMethodId, amount } = req.body;
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // amount in cents
      currency: "usd",
      payment_method: paymentMethodId,
      confirm: true,
    });

    // Update order payment status
    await Order.findByIdAndUpdate(orderId, { paymentStatus: "Paid" });

    res
      .status(200)
      .json({ success: true, message: "Payment processed successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Payment failed", error });
  }
});

module.exports = router;
