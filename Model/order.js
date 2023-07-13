const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const productSchema = new mongoose.Schema({
  _id: { type: Schema.Types.ObjectId, required: true },
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ["프론트엔드", "프론트앤드", "백엔드", "CS지식"],
    required: true,
  },
  price: {
    type: Number,
    trim: true,
    min: 0,
    required: true,
  },
  imageURL: {
    type: String,
    // 아무 값도 없으면 default 링크로 초기화 해서 mongoDB에 삽입/수정
    default: "",
  },
  desc: {
    type: String,
  },
  bookNum: { type: Number },
});

const orderSchema = new mongoose.Schema(
  {
    products: {
      type: [productSchema],
      require: true,
    },
    orderedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    paymentOption: {
      type: String,
      require: true,
      enum: ["카드", "계좌이체"],
    },
    amount: { type: Number, require: true },
    price: { type: Number, require: true },
    deliveryState: {
      type: String,
      require: true,
    },
    address: { type: String, require: true },
    detailAddress: { type: String },
  },
  { collection: "order", timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = { Order };
