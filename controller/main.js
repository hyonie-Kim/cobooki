exports.mainRender = (req, res) => {
  res.render("index");
};

exports.order = (req, res) => {
  res.render("order");
};

exports.cart = (req, res) => {
  res.render("cart");
};

exports.deleteUser = (req, res) => {
  res.render("deleteUser");
};
