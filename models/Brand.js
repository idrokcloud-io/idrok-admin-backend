const mongoose = require("mongoose");
const { Schema } = mongoose;

const brandSchema = new Schema({
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
    products: [
        {
            type: Schema.Types.ObjectId,
            ref: "Products",
        },
    ],
    cars: [
        {
            type: Schema.Types.ObjectId,
            ref: "Cars",
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Brands", brandSchema);
