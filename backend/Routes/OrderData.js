const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

router.post('/orderData', async (req, res) => {
    console.log("🔹 Received request at /orderData");  
    console.log("Received email:", req.body.email);

    if (!req.body.email) {
        return res.status(400).json({ error: "User email not found. Please log in." });
    }

    let data = req.body.order_data;

    if (!Array.isArray(data)) {
        return res.status(400).json({ error: "Invalid order data format." });
    }

    // ✅ Add Order_date only ONCE to the beginning of the array
    data.unshift({ Order_date: new Date() });

    try {
        let existingOrder = await Order.findOne({ email: req.body.email });

        if (!existingOrder) {
            await Order.create({
                email: req.body.email,
                order_data: [data]  // Wrap in array
            });
        } else {
            await Order.findOneAndUpdate(
                { email: req.body.email },
                { $push: { order_data: data } }
            );
        }

        return res.json({ success: true });
    } catch (error) {
        console.error("🔹 ERROR:", error.message);
        return res.status(500).send("Server Error");
    }
});

router.post('/myOrderData', async (req, res) => {
    if (!req.body.email) {
        return res.status(400).json({ error: "User email not found. Please log in." });
    }

    try {
        let myData = await Order.findOne({ email: req.body.email });
        
        if (!myData || !myData.order_data.length) {
            return res.json({ orderData: [] });
        }

        res.json({ orderData: myData.order_data });
    } catch (error) {
        console.error("🔹 Server Error:", error.message);
        res.status(500).json({ error: "Server Error: " + error.message });
    }
});

module.exports = router;
