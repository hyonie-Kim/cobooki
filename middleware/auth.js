const { User } = require("../Model/user");

const auth = {
  authentication(req, res, next) {
    if (req.session.userEmail) {
      next();
    } else {
      res.redirect("/user/login");
    }
  },

  async authorization(req, res, next) {
    const user = await User.findOne({ email: req.session.userEmail });
    if (user.role === "ADMIN") {
      next();
    } else {
      res.status(403).send({
        result: "fail",
        message: "권한 없음",
      });
    }
  },
};

module.exports = auth;
