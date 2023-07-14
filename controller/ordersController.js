const { Order } = require("../Model/order");
const { User } = require("../Model/user");
const { Product } = require("../Model/product");
const isValidObjectId = require("mongoose");

const ordersController = {
  // 주문 정보 등록
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
        price: req.body.price,
        amount: req.body.amount,
        address: req.body.address,
        detailAddress: req.body.detailAddress,
        deliveryState: "주문 완료",
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

  // 주문 정보 수정
  async updateOrder(req, res) {
    try {
      // 1. axios PUT /orders/:orderId로 주문 상태 수정 요청
      // params: 주문번호(objectID), body: 주문자(userObjectId)
      // 2. params에서 orderId 추출
      // 3. 얻은 id로 product 상태 update
      // 4. 응답 처리
      const { orderId } = req.params;
      const order = await Order.findOneAndUpdate(
        { _id: orderId, orderedBy: req.body.ordererId },
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
      console.log("orderId========", orderId);
      console.log("req.body======", req.body.ordererId);

      await Order.deleteOne({
        _id: orderId,
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

module.exports = ordersController;
