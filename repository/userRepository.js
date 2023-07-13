const { Counter } = require("../Model/counter");
const User = require("../Model/user");

const userRepository = {
  async findOne({ email }) {
    const user = await User.findOne({ email });
    return user;
  },

  async userFindCount({ name }) {
    const userCounter = await Counter.findOne({ name });
    return userCounter;
  },

  async create({ email, password, name, phone, address, detailAddress, role }) {
    const user = new User({
      email,
      password,
      name,
      phone,
      address,
      detailAddress,
      role,
    });

    await user.save();
    return user.toObject();
  },

  async userCountUpdate() {
    const userCountUpdate = Counter.findOneAndUpdate(
      { name: "counter" },
      { $inc: { userNum: 1 } }
    );
    return userCountUpdate;
  },

  async deleteUser({ email }) {
    const user = await User.findByIdAndDelete({ email });
    if (!user) return false;
    else return true;
  },
};

module.exports = userRepository;
