const User = require("../Model/user");

const userRepository = {
  async findOne({ email }) {
    const user = User.findOne({ email });
    return user;
  },

  async create({ email, password, name, phone, address, detail_address }) {
    const user = new User({
      email,
      password,
      name,
      phone,
      address,
      detail_address,
    });

    await user.save();
    return user.toObject();
  },

  async deleteUser({ email }) {
    const user = User.findByIdAndDelete({ email });
    if (!user) return false;
    else return true;
  },
};

module.exports = userRepository;
