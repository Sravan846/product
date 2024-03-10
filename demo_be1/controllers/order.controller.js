const orderSchema = require('../model/order');

module.exports = {
    neworder: async (req, res) => {
        try {
            const { id } = req.user
            req.body.orderBy = id
            const newOrder = new orderSchema(req.body)
            newOrder.save().then((result) => {
                return res.status(200).json({ message: "order  is added", isSuccess: true })
            }).catch((err) => {
                return res.status(400).json({ message: err.message, isSuccess: false })
            });
        } catch (error) {
            return res.status(500).json({ message: err.message, isSuccess: false })
        }
    },
    updateOrderById: async (req, res) => {
        try {
            const { id } = req.params
            await orderSchema.findByIdAndUpdate(id, req.body)
            return res.status(200).json({ message: "order  is updated", isSuccess: true })
        } catch (error) {
            return res.status(500).json({ message: error.message, isSuccess: false })
        }
    },
    getOrderById: async (req, res) => {
        try {
            const { id } = req.params
            const response = await orderSchema.findById(id).populate(["productId", "orderBy"])
            return res.status(200).json({ message: "order details", response, isSuccess: true })
        } catch (error) {
            return res.status(500).json({ message: error.message, isSuccess: false })
        }
    },
    getAllOrder: async (req, res) => {
        try {
            const { page = 1 } = req.query;
            var perPage = req.query.perPage ? req.query.perPage : 25
            const data = await orderSchema
                .find(req.query)
                .skip(perPage * page - perPage)
                .limit(perPage)
                .sort({ '_id': -1 })
            const count = data.length
            res.status(201).send({
                message: "List of order",
                data,
                current: page,
                totalCount: count,
                pages: Math.ceil(count / perPage),
                isSuccess: true
            });
        } catch (error) {
            return res.status(500).json({ message: error.message, isSuccess: false })
        }
    },
    deleteOrderById: async (req, res) => {
        try {
            const { id } = req.params
            await orderSchema.findByIdAndDelete(id)
            return res.status(200).json({ message: "order is deleted", isSuccess: true })
        } catch (error) {
            return res.status(500).json({ message: error.message, isSuccess: false })
        }
    }
}