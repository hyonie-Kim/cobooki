const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    products: {
      type: [productSchema],
      require: true,
    },
    orderedBy: {
      type: mongoose.Types.ObjectId,
      require: true,
    },
    paymentOption: {
      type: String,
      require: true,
      enum: ["카드", "계좌이체"],
    },
    address: { type: String, require: true },
    detailAddress: { type: String },
  },
  { collection: "order" }
);

module.exports = mongoose.model("Order", orderSchema);
