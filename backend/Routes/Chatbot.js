const express = require('express');
const router = express.Router();

router.post('/chatbot', async (req, res) => {
    const userMessage = req.body.message.toLowerCase();

    let response;

    if (userMessage.includes('hello')) {
        response = 'Hi there! How can I help you today?';

    } else if (userMessage.includes('order')) {
        response = 'You can view and place your orders on the Home page.';

    } else if (
        userMessage.includes('best') &&
        (userMessage.includes('veg') || userMessage.includes('non veg') || userMessage.includes('non-veg'))
    ) {
        response = 'In Veg, Paneer Butter Masala is our top dish. In Non-Veg, Chicken Biryani is a customer favorite!';

    } else if (
        userMessage.includes('lowest') &&
        userMessage.includes('veg')
    ) {
        response = 'In Veg, Fried Rice is the lowest priced at ₹110.';

    } else if (
        userMessage.includes('lowest') &&
        (userMessage.includes('non veg') || userMessage.includes('non-veg'))
    ) {
        response = 'In Non-Veg, Chicken Fried Rice is the lowest priced at ₹130.';

    } else {
        response = "Sorry, I did not get that. Please try again.";
    }

    res.json({ reply: response });
});

module.exports = router;
