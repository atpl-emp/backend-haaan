const mongoose = require("mongoose");

function generateRandomNumber() {
  return Math.floor(Math.random() * 5) + 2; // Generates random number between 2 and 6
}
const orderedProductSchema = mongoose.Schema({
  brand: { type: String, required: true },
  MRP: { type: Number, required: true },
  finalPrice: { type: Number, required: true },
  img: { type: String, required: true },
  orderedDate: { type: Date, default: Date.now },
  expectedDeliveryDate: { type: Number, default: generateRandomNumber },
});
const OrderedProductModel = mongoose.model(
  "ordered_product",
  orderedProductSchema
);

module.exports = { OrderedProductModel };
