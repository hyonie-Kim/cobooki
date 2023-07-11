const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    product: {
      type: [productSchema],
      validate: (v) => Array.isArray(v) && v.length > 0,
      require: true,
    },
    orderedBy: {
      type: [userSchema],
      // 추가 검증을 위한 함수. 삽입/수정 전 해당 값이 최소 하나 이상의 값을 가지고 있는 배열인지 체크
      validate: (v) => Array.isArray(v) && v.length > 0,
      require: true,
    },
    password: {
      type: String,
      require: true,
      trim: true,
    },
    paymentOption: {
      type: String,
      require: true,
      enum: ["카드", "계좌이체"],
    },
  },
  { collection: "order" }
);

module.exports = mongoose.model("Order", orderSchema);
