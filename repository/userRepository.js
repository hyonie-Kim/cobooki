const User = require("../Model/user");

const userRepository = {
  async findOne({ email }) {
    const user = await User.findOne({ email });
    return user;
  },

  async create({ email, password, name, phone, address, detailAddress }) {
    const user = new User({
      email,
      password,
      name,
      phone,
      address,
      detailAddress,
    });

    await user.save();
    return user.toObject();
  },

  async deleteUser({ email }) {
    const user = await User.findByIdAndDelete({ email });
    if (!user) return false;
    else return true;
  },
};

module.exports = userRepository;
