const { User } = require("../Model/user");

const myprofileController = {
  getProfile(req, res) {
    User.findOne({ email: req.session.userEmail })
      .select("name email phone address")
      .exec()
      .then((userInfo) => {
        console.log(userInfo);
        res.render("myProfile", { userInfo: userInfo });
      });
  },
};

module.exports = myprofileController;
