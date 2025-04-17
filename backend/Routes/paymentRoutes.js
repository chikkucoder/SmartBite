require("dotenv").config(); // Load environment variables
const Razorpay = require("razorpay");
const express = require("express");
const router = express.Router();

// ✅ Correct Debugging Log
console.log("RAZORPAY_KEY_ID:", process.env.RAZORPAY_KEY_ID);
console.log("RAZORPAY_KEY_SECRET:", process.env.RAZORPAY_KEY_SECRET);

if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
  console.error("❌ Razorpay API keys are missing! Check your .env file.");
  process.exit(1); // Stop execution if keys are missing
}

// ✅ Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,      // ✅ Corrected
  key_secret: process.env.RAZORPAY_KEY_SECRET,  // ✅ Corrected
});

// ✅ Create Order Route
router.post("/create-order", async (req, res) => {
  try {
    const { amount, currency } = req.body;
    const options = {
      amount: amount * 100, // Convert to paise
      currency: currency || "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    console.error("❌ Error creating order:", error);
    res.status(500).json({ error: "Error creating Razorpay order" });
  }
});

module.exports = router;
