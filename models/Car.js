const mongoose = require("mongoose");
const { Schema } = mongoose;

const carSchema = new Schema({
    uz: {
        name: {
            type: String,
        },
    },
    ru: {
        name: {
            type: String,
        },
    },
    brand: {
        type: Schema.Types.ObjectId,
        ref: "Brands",
    },
    products: [
        {
            type: Schema.Types.ObjectId,
            ref: "Products",
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Cars", carSchema);
