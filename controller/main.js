exports.mainRender = (req, res) => {
  res.render("index");
};

exports.order = (req, res) => {
  res.render("order");
};

exports.cart = (req, res) => {
  res.render("cart");
};

exports.header = (req, res) => {
  //test(지우)
  console.log("data: " + req.params.str);
  res.render("header");
};

exports.myProfile = (req, res) => {
  res.render("myProfile");
};

exports.deleteUser = (req, res) => {
  res.render("deleteUser");
};
