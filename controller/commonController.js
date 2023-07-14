const User = require("../Model/user");
const { userService } = require("../service");

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
    const user = await User.findOne({ email: req.session.userEmail })
      .select("name email phone address")
      .exec();
    const product = await Product.findOne({
      bookNum: req.query.bookNum,
    })
      // 결제하기 버튼 함수에서 form태그로 GET /orders에 bookNum을 보내주세욥...ㅎㅎ
      .select("name category price imageURL inventory bookNum")
      .exec();
    res.render("order", {
      user,
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

  // 로그인 확인 api
  async signIn(req, res) {
    const date = new Date();
    const user = await userService.findUser({ email: req.body.email });
    if (!user) {
      // 아이디 없음
      // res.send({ msg: "아이디를 확인해주세요" });
      res.status(400).send({ msg: "아이디를 확인해주세요" });
    } else {
      // 아이디 존재
      if (user && bcrypt.compareSync(req.body.password, user.password)) {
        // 로그인 성공
        if (req.body.rememberMe == 1) {
          // 자동로그인 체크
          req.session.cookie.maxAge = date.setMinutes(
            date.getMinutes() + 60 * 24 * 30
          );
        }
        req.session.userEmail = req.body.email;
        req.session.userName = user.name;
        console.log(`${user.name} 로그인 하셨습니다.👋🏻`);
        res.status(200).send({ msg: "로그인 성공", user: user });
      } else {
        res.status(400).send({ msg: "비밀번호를 확인해주세요" });
      }
    }
  },

  // 회원가입 확인 api
  async signUp(req, res) {
    const user = await userService.findUser({ email: req.body.email });
    if (!user) {
      // 몽구스 사용해서 회원 DB에 저장
      // 비밀번호 암호화
      const salt = bcrypt.genSaltSync();
      const hash = bcrypt.hashSync(req.body.password, salt);

      const createUser = await userService.createUser({
        email: req.body.email,
        password: hash,
        name: req.body.name,
        phone: req.body.phone,
        address: req.body.address,
        detailAddress: req.body.detailAddress,
        role: "USER",
      });

      res.status(200).send({ msg: "회원가입 성공", user: createUser });
    } else {
      res.status(400).send({ msg: "회원 중복 :: ID 수정" });
    }
  },
};

module.exports = commonController;
