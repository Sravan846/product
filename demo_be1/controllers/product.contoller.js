const productSchema = require('../model/product');

module.exports = {
    newProduct: async (req, res) => {
        try {
            const { title } = req.body
            const { id, isAdmin } = req.user
            if (!isAdmin) {
                return res.status(401).json({ message: "You don't have access for this api", isSuccess: false })
            }
            const checktile = await productSchema.findOne({ title })
            if (checktile) {
                return res.status(401).json({ message: "this title is already used", isSuccess: false })
            }
            req.body.createdBy = id
            req.body.image = req.file.filename
            const newProduct = new productSchema(req.body)
            newProduct.save().then((result) => {
                return res.status(200).json({ message: "product  is added", isSuccess: true })
            }).catch((err) => {
                return res.status(400).json({ message: err.message, isSuccess: false })
            });
        } catch (error) {
            return res.status(500).json({ message: err.message, isSuccess: false })
        }
    },
    updateProductById: async (req, res) => {
        try {
            const { isAdmin } = req.user
            const { id } = req.params
            if (!isAdmin) {
                return res.status(401).json({ message: "You don't have access for this api", isSuccess: false })
            }
            req.body.image = req.file.filename
            await productSchema.findByIdAndUpdate(id, req.body)
            return res.status(200).json({ message: "product  is updated", isSuccess: true })
        } catch (error) {
            return res.status(500).json({ message: error.message, isSuccess: false })
        }
    },
    getProductById: async (req, res) => {
        try {
            const { id } = req.params
            const response = await productSchema.findById(id)
            return res.status(200).json({ message: "poduct details", response, isSuccess: true })
        } catch (error) {
            return res.status(500).json({ message: error.message, isSuccess: false })
        }
    },
    getAllProduct: async (req, res) => {
        try {
            const { page = 1 } = req.query;
            var perPage = req.query.perPage ? req.query.perPage : 25
            const data = await productSchema
                .find(req.query)
                .skip(perPage * page - perPage)
                .limit(perPage)
                .sort({ '_id': -1 })
            const count = data.length
            res.status(201).send({
                message: "List of product",
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
    deleteProductById: async (req, res) => {
        try {
            const { isAdmin } = req.user
            const { id } = req.params
            if (!isAdmin) {
                return res.status(401).json({ message: "You don't have access for this api", isSuccess: false })
            }
            await productSchema.findByIdAndDelete(id)
            return res.status(200).json({ message: "product is deleted", isSuccess: true })
        } catch (error) {
            return res.status(500).json({ message: error.message, isSuccess: false })
        }
    }
}