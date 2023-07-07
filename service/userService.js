const { userRepository } = require("../repository");

const userService = {
  async findUser({ email }) {
    const user = await userRepository.findOne({ email });
    return user;
  },

  async createUser({ email, password, name }) {
    const user = await userRepository.create({ email, password, name });
    return user;
  },
};

module.exports = userService;
