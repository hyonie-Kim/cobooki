exports.index = (req, res) => {
  res.render("index");
};
exports.signIn = (req, res) => {
  res.render("signIn");
};

exports.signUp = (req, res) => {
  res.render("signUp");
};

exports.order = (req, res) => {
  res.render("order");
};

exports.cart = (req, res) => {
  res.render("cart");
};
