const mongoose = require("mongoose");
const { Schema } = mongoose;

const carModelSchema = new Schema({
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
    image: {
        type: String,
    },
    car: {
        type: Schema.Types.ObjectId,
        ref: "Cars",
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

module.exports = mongoose.model("CarModel", carModelSchema);
