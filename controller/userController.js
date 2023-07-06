const User = require("../Model/user"); // User 스키마 연결
const bcrypt = require("bcryptjs"); // 비밀번호 암호화 라이브러리

exports.signInRender = (req, res) => {
  res.render("signIn");
};

// 함수명은 동사, 변수명은 명사로!
exports.signIn = async (req, res) => {
  const date = new Date();
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    // 아이디 없음
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
      res.status(200).send({ msg: "로그인 성공" });
    } else {
      res.status(400).send({ msg: "비밀번호를 확인해주세요" });
    }
  }
};
exports.signupRender = (req, res) => {
  res.status(200).render("signUp");
};
exports.signUp = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    // 몽구스 사용해서 회원 DB에 저장
    // 비밀번호 암호화
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(req.body.password, salt);

    const user = new User({
      email: req.body.email,
      password: hash,
      name: req.body.name,
    });
    await user
      .save()
      .then(() => res.status(200).send({ msg: "회원가입 성공" }))
      .catch((err) => console.error(err));
  } else {
    res.status(400).send({ msg: "회원 중복 :: ID 수정" });
  }
};

exports.order = (req, res) => {
  res.render("order");
};

exports.cart = (req, res) => {
  res.render("cart");
};
