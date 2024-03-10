const mongoose = require("mongoose");

const new_mongoose = new mongoose.Schema({
    productId: {
        type: mongoose.Types.ObjectId,
        ref: "product"
    },
    quantity: {
        type: Number,
    },
    amount: {
        type: Number,
    },
    orderBy: {
        type: mongoose.Types.ObjectId,
        ref: "user"
    },
    status: {
        type: String,
        default: "pending"
    }
}, { timestamps: true });

const order = mongoose.model("order", new_mongoose);
module.exports = order;
