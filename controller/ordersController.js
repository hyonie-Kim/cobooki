const { Order } = require("../Model/order");
const User = require("../Model/user");
const { Product } = require("../Model/product");
const isValidObjectId = require("mongoose");

const ordersController = {
  // 상품 결제 창 렌더 - /orders
  async getOrder(req, res) {
    const user = await User.findOne({ email: req.session.userEmail })
      .select("name email phone address")
      .exec();
    const product = await Product.findOne({
      bookNum: req.params.bookNum,
    })
      // 결제하기 버튼 함수에서 form태그로 GET /orders에 bookNum을 보내주세욥...ㅎㅎ
      .select("name category price imageURL inventory bookNum")
      .exec();
    res.render("order", {
      user,
      product,
    });
  },

  // 결제하기 버튼(order DB에 데이터 저장) - /orders
  async insertOrder(req, res) {
    try {
      const user = await User.findOne({ email: req.session.userEmail }).exec();
      const product = await Product.findOne({
        bookNum: req.body.bookNum,
      }).exec();
      const order = new Order({
        products: product,
        orderedBy: user._id,
        paymentOption: req.body.paymentOption,
        address: req.body.address,
        detailAddress: req.body.detailAddress,
      });
      order.save();
      res.send({
        result: "success",
        message: "주문 조회 저장 완료",
      });
    } catch (error) {
      console.log("err: ", error);
      res.status(500).send({
        message: "server error",
      });
    }
  },

  // 주문 리스트 확인 - /myprofile/ordercheck
  async getOrderList(req, res) {
    console.log("주문 리스트 확인 시작");
    const user = await User.findOne({ email: req.session.userEmail }).exec();
    const orders = await Order.find({ orderedBy: user._id }).exec();
    console.log("orders----------", orders);
    res.render("orderCheck", {
      orders,
    });
  },

  // 주문 수정(진행중)
  oderEdit(req, res) {
    try {
      const { userId } = req.params;
      if (!isValidObjectId(userId)) res.status(400).send({ err: "에러" });

      const { paymentOption, address, products } = req.body;
      const order = Order.findOneAndUpdate(
        { _id: userId },
        { paymentOption, address, products },
        { new: true }
      );
    } catch (err) {}
  },

  //
};

module.exports = ordersController;
