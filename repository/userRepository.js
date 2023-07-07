const User = require("../Model/user");

const userRepository = {
  async findOne({ email }) {
    const user = User.findOne({ email });
    return user;
  },

  async create({ email, password, name }) {
    const user = new User({
      email,
      password,
      name,
    });

    await user.save();
    return user.toObject();
  },
};

module.exports = userRepository;
