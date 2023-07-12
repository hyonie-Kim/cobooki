exports.orderCheck = (req, res) => {
  res.render("orderCheck", { userEmail: (req.session.userEmail != null) ? req.session.userEmail : null });
};
