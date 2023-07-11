const { productRepository } = require("../repository");

const productService = {
  // async findCount({ name }) {
  //   const counter = await productRepository.findOne({ name })
  //   return counter;
  // },

  async createProduct(temp) {
    const counter = await productRepository.findCount({ name: "counter" });
    temp.postNum = counter.postNum;
    const product = await productRepository.create(temp);
    if (product) {
      productRepository.countUpdate();
      return true;
    } else return false;
  },
};
module.exports = productService;
