exports.adminRender = (req, res) => {
  res.render("admin/adminPage");
};

exports.upload = (req, res) => {
  res.render("admin/upload");
};

exports.order = (req, res) => {
  res.render("admin/orderManagement ");
};

// exports.post_upload = (req, res) => {
//   console.log(req.body);

//   insertOne({
//     title: req.body.title,
//     content: req.body.content,
//   })
//     .then(() => {
//       res.send("상품을 등록 하였습니다.");
//     })
//     .catch((err) => {
//       console.log(err);
//       res.send("상품등록 실패 하였습니다.");
//     });
// };
