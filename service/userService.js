const { userRepository } = require("../repository");

const userService = {
  async findUser({ email }) {
    const user = await userRepository.findOne({ email });
    return user;
  },

  async createUser({ email, password, name, phone, address, detail_address }) {
    const user = await userRepository.create({
      email,
      password,
      name,
      phone,
      address,
      detail_address,
    });
    return user;
  },

  async deleteUser({ email }) {
    const isUser = await userRepository.deleteUser({
      email,
    });
    if (!isUser) return false;
    else return true;
  },
};

module.exports = userService;
