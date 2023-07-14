const { User } = require("../Model/user"); // User 스키마 연결
const { Product } = require("../Model/product");
const { Counter } = require("../Model/counter");
const { productService } = require("../service");
const { Order } = require("../Model/order");

const adminController = {
  // 회원 관리 리스트
  async adminRender(req, res) {
    const users = await User.find({});
    res.render("admin/adminPage", { users });
  },

  uploadRender(req, res) {
    res.render("admin/upload");
  },

  order(req, res) {
    res.render("admin/orderManagement", {
      userEmail: req.session.userEmail != null ? req.session.userEmail : null,
    });
  },

  // 상품 등록
  async upload(req, res) {
    let temp = {
      // _id: counterInfo.bookNum,
      name: req.body.name,
      category: req.body.category,
      desc: req.body.desc,
      imageURL: req.body.imageURL,
      inventory: req.body.inventory,
      price: req.body.price,
    };
    //console.log(req.body);

    const NewProduct = await productService.createProduct(temp);
    if (NewProduct) {
      res.send("상품 저장 성공");
      // res.redirect("/")
    } else res.send("상품저장실패");
  },

  // 주문 수정(진행중)
  // /orders/:orderId: 본인 ID를 주문자 ID(ordererId)로 삼고 orderId를 사용해서 업데이트할 데이터를 DB에 업데이트
  async updateOrder(req, res) {
    try {
      // 1. axios PUT /orders/:orderId로 주문 상태 수정 요청
      // 2. params에서 orderId 추출
      // 3. 얻은 id로 product 상태 update
      // 4. 응답 처리
      const { orderId } = req.params;
      const order = await Order.findOneAndUpdate(
        { orderedBy: orderId },
        {
          deliveryState: req.body.deliveryState,
        },
        { new: true }
      ).select("deliveryState");
      console.log("update order: ", order);
      console.log("-======================");
      res.send({
        result: "success",
        data: order,
      });
    } catch (err) {
      console.log("error: ", err);
      res.status(500).send({
        message: "server error",
      });
    }
  },

  async deleteOrder(req, res) {
    try {
      const { orderId } = req.params;
      await Order.deleteOne({
        orderedBy: orderId,
        orderedBy: req.body.ordererId,
      }).exec();
      res.send({
        result: "success",
        message: "주문 취소 완료",
      });
    } catch (error) {
      console.log("error: ", error);
      res.status(500).send({ message: "server error" });
    }
  },
};

module.exports = adminController;
