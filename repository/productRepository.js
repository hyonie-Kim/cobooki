const { Counter } = require("../Model/counter");
const { Product } = require("../Model/product");

const productRepository = {
  async findCount({ name }) {
    const counter = await Counter.findOne({ name });
    return counter;
  },

  async create(temp) {
    const newProduct = new Product(temp);
    await newProduct.save();
    return true;
  },

  async countUpdate() {
    const countUpdate = Counter.findOneAndUpdate(
      { name: "counter" },
      { $inc: { bookNum: 1 } }
    );
    return true;
  },
};

module.exports = productRepository;
