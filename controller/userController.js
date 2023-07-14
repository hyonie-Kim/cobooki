const { User } = require("../Model/user"); // User 스키마 연결
const bcrypt = require("bcryptjs"); // 비밀번호 암호화 라이브러리
const { userService } = require("../service");

const userController = {
  async createUser(req, res) {
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

  async deleteUser(req, res) {
    const deleteUser = await userService.deleteUser({
      email: req.session.userEmail,
    });
    if (!deleteUser) {
      res.status(400).send({ msg: "회원 ID가 없습니다." });
    } else {
      res.status(200).send({ msg: "회원 탈퇴가 완료되었습니다." });
    }
  },

  async updateUser(req, res) {
    try {
      // 클라이언트가 보낸 데이터에 password가 있는 경우
      if (req.body.password) {
        // salt: 무작위 값
        // hash: 변경할 새 password(req.body.password)와 salt(무작위 데이터) 값을 섞어 생성한 암호화 데이터
        const salt = bcrypt.genSaltSync();
        const hash = bcrypt.hashSync(req.body.password, salt);
        // hash(암호화 데이터)를 req.body.password에 재할당
        req.body.password = hash;
      }

      // DB에 변경된 사용자 정보 수정
      await User.updateOne({ email: req.session.userEmail }, req.body);
      res.status(200).send({
        result: "success",
        message: "회원 정보 수정 완료.",
      });
    } catch (error) {
      res.status(500).send({ message: "server error" });
    }
  },
};

module.exports = userController;
