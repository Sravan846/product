const express = require('express');
const orderCTRL = require('../controllers/order.controller');
const validate = require('../middleware/validator');

const orderRouter = express.Router();
orderRouter.post("/add", validate.orderShema, orderCTRL.neworder)
orderRouter.get("/", orderCTRL.getAllOrder)
orderRouter.get("/:id", orderCTRL.getOrderById)
orderRouter.put("/:id", validate.orderShema, orderCTRL.updateOrderById)
orderRouter.delete("/:id", orderCTRL.deleteOrderById)

module.exports = orderRouter