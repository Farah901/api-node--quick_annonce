const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  city: { type: String, required: true },
  created_at: { type: Date, default: Date.now } // Add created_at column
});

module.exports = mongoose.model("Article", articleSchema);
