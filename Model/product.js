const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
    },
    // author: {
    //   type: String,
    //   required: true,
    // },
    category: {
      type: String,
      // enum: ["프론트엔드", "백엔드", "CS지식"],
      required: true,
    },
    price: {
      type: Number,
      trim: true,
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
    inventory: {
      type: String,
      min: 0,
      default: 10,
      required: true,
    },
    bookNum: { type: Number },
  },
  { collection: "product", timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
module.exports = { Product };
