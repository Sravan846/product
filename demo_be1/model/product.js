const mongoose = require("mongoose");

const new_mongoose = new mongoose.Schema({
    image: {
        type: String,
    },
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    totalQuantity: {
        type: Number,
    },
    amount: {
        type: Number,
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: "user"
    }
}, { timestamps: true });

const product = mongoose.model("product", new_mongoose);
module.exports = product;
