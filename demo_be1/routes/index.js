const express = require('express');
const userRouter = require('./user');
const productRouter = require('./product');
const orderRouter = require('./order');
const verifytoken = require('../middleware/auth');


const mainRouter = express.Router();
mainRouter.use("/user", userRouter)
mainRouter.use("/product", verifytoken, productRouter)
mainRouter.use("/order", verifytoken, orderRouter)

module.exports = mainRouter