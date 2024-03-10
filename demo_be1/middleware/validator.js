const joi = require('joi');
module.exports = {
    registerSchema: (req, res, next) => {
        try {
            const schema = joi.object({
                name: joi.string().required().label("name"),
                email: joi.string().required().email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }).label("email"),
                password: joi.string().required().label("password"),
            })
            const { error } = schema.validate(req.body)
            if (error) {
                res.status(400).json({ message: error.message, isSuccess: false })
            } else {
                next()
            }
        } catch (error) {
            res.status(400).json({ message: error.message, isSuccess: false })
        }
    },
    loginSchema: (req, res, next) => {
        try {
            const schema = joi.object({
                email: joi.string().required().email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }).label("email"),
                password: joi.string().required().label("password"),
            })
            const { error } = schema.validate(req.body)
            if (error) {
                res.status(400).json({ message: error.message, isSuccess: false })
            } else {
                next()
            }
        } catch (error) {
            res.status(400).json({ message: error.message, isSuccess: false })
        }
    },
    productSchema: (req, res, next) => {
        try {
            const schema = joi.object({
                title: joi.string().required().label("Title"),
                description: joi.string().required().label("description"),
                totalQuantity: joi.number().required().label("totalQuantity"),
                amount: joi.number().required().label("amount"),
            })
            const { error } = schema.validate(req.body)
            if (error) {
                res.status(400).json({ message: error.message, isSuccess: false })
            } else {
                next()
            }
        } catch (error) {
            res.status(400).json({ message: error.message, isSuccess: false })
        }
    },
    orderShema: (req, res, next) => {
        try {
            const schema = joi.object({
                productId: joi.objectId().required().label("productId"),
                quantity: joi.number().required().label("totalQuantity"),
                amount: joi.number().required().label("amount"),
                status: joi.valid(["pending", "completed", "cancel"]).required().label("status"),
            })
            const { error } = schema.validate(req.body)
            if (error) {
                res.status(400).json({ message: error.message, isSuccess: false })
            } else {
                next()
            }
        } catch (error) {
            res.status(400).json({ message: error.message, isSuccess: false })
        }
    }
}