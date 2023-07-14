const { User } = require("../Model/user");
const { Product } = require("../Model/product");
const { Order } = require("../Model/order");

const commonController = {
  mainRender(req, res) {
    Product.find()
      .exec()
      .then((bookData) => {
        // console.log(
        //   "====================================== 메인페이지 ===============",
        //   bookData
        // );
        res.render("index", {
          bookData: bookData,
          userEmail:
            req.session.userEmail != null ? req.session.userEmail : null,
        });
      })
      .catch((err) => {
        console.log(err);
        res.render("index", {
          bookData: [],
          userEmail:
            req.session.userEmail != null ? req.session.userEmail : null,
        });
      });
  },

  async signupRender(req, res) {
    res.status(200).render("signUp", {
      userEmail: req.session.userEmail != null ? req.session.userEmail : null,
    });
  },

  async signInRender(req, res) {
    res.render("signIn", {
      userEmail: req.session.userEmail != null ? req.session.userEmail : null,
    });
    return;
  },

  async deleteRender(req, res) {
    res.render("deleteUser", {
      userEmail: req.session.userEmail != null ? req.session.userEmail : null,
    });
  },

  async profileRender(req, res) {
    User.findOne({ email: req.session.userEmail })
      .select("name email phone address")
      .exec()
      .then((userInfo) => {
        console.log(userInfo);
        res.render("myProfile", { userInfo: userInfo });
      });
  },

  async adminUserListRender(req, res) {
    const users = await User.find({});
    res.render("admin/adminPage", { users });
  },

  async adminProductListRender(req, res) {
    // 만들어야 함!
    const products = await Product.find({});
    res.render("admin/upload", { products });
  },

  async adminOrderListRender(req, res) {
    // 만들어야 함!
    const orders = await Order.find({});
    res.render("admin/orderManagement", { orders });
  },

  async booksRender(req, res) {
    Product.find({ category: req.query.category })
      .exec()
      .then((bookData) => {
        console.log(
          "====================================== 카테고리 페이지 ===============",
          bookData
        );
        res.render("products", {
          bookData: bookData,
          userEmail:
            req.session.userEmail != null ? req.session.userEmail : null,
        });
      })
      .catch((err) => {
        console.log(err);
        res.render("products", {
          bookData: [],
          userEmail:
            req.session.userEmail != null ? req.session.userEmail : null,
        });
      });
  },

  async detailBooksRender(req, res) {
    Product.findOne({ bookNum: req.params.bookNum })
      .exec()
      .then((bookInfo) => {
        console.log(
          "====================================== 상세페이지 ===============",
          bookInfo
        );
        // res.send({ bookInfo: docInfo });
        res.render("detailPage", {
          bookInfo,
          userEmail:
            req.session.userEmail != null ? req.session.userEmail : null,
        });
      });
  },

  async cartsRender(req, res) {
    if (req.session.userEmail == null) {
      res.render(
        "signIn",
        //📌지우
        { userEmail: null }
      );
      //res.write("<script>alert('로그인이 필요한 서비스입니다.')</script>");
    } else {
      res.render("cart", {
        userEmail: req.session.userEmail != null ? req.session.userEmail : null,
      });
      //res.write("<script>alert('🫡장바구니에 담겼습니다! \n 장바구니 페이지로 이동합니다.')</script>");
    }
  },

  // 상품 결제 창 렌더
  async ordersRender(req, res) {
    console.log("============상품결제 렌더 시작");
    const user = await User.findOne({ email: req.session.userEmail })
      .select("name email phone address")
      .exec();
    // 결제하기 버튼 함수에서 form태그로 GET /orders에 bookNum을 보내주세욥...ㅎㅎ
    const product = await Product.findOne({
      bookNum: req.params.bookNum,
    })
      .select("name category price imageURL inventory bookNum")
      .exec();
    console.log(user, product);
    res.render("order", {
      userInfo: user,
      product,
      userEmail: req.session.userEmail != null ? req.session.userEmail : null,
    });
  },

  // 마이페이지 주문 확인 렌더
  async myOrderListRender(req, res) {
    console.log("주문 리스트 확인 시작");
    const user = await User.findOne({ email: req.session.userEmail }).exec();
    const orders = await Order.find({ orderedBy: user._id }).exec();
    console.log("orders----------", orders);
    res.render("orderCheck", {
      orders,
      userEmail: req.session.userEmail != null ? req.session.userEmail : null,
    });
  },

  async logout(req, res) {
    req.session.destroy((err) => {
      if (err) console.error(err);
      else res.redirect("/");
    });
  },
};

module.exports = commonController;
