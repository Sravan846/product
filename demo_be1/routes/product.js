const express = require('express');
const productCTRL = require('../controllers/product.contoller');
const validate = require('../middleware/validator');
const upload = require('../config/multer');


const productRouter = express.Router();
productRouter.post("/add", [upload.single('image'), validate.productSchema], productCTRL.newProduct)
productRouter.get("/", productCTRL.getAllProduct)
productRouter.get("/:id", productCTRL.getProductById)
productRouter.put("/:id", [upload.single('image'), validate.productSchema], productCTRL.updateProductById)
productRouter.delete("/:id", productCTRL.deleteProductById)

module.exports = productRouter