const Razorpay = require('razorpay'); // Correct spelling
require('dotenv').config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,      // Ensure these exist in your .env
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

module.exports = razorpay;
