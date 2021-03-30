const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
    uz: {
        type: {
            title: {
                type: String,
                required: true,
            },
            description: {
                type: String,
                required: true,
            },
            characteristics: {},
        },
        select: false,
    },
    ru: {
        type: {
            title: {
                type: String,
                required: true,
            },
            description: {
                type: String,
                required: true,
            },
            characteristics: {},
        },
        select: false,
    },
    // type will changed
    type: {
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
    image: {
        type: String,
        required: true,
    },
    rating: {
        data: [
            {
                user: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Users",
                },
                score: {
                    type: Number,
                },
                comment: {
                    type: String,
                },
                date: {
                    type: Date,
                },
            },
        ],
        count: {
            type: Number,
            default: 0,
        },
        overall: {
            type: Number,
            default: 0,
        },
    },
    rated_users: {
        type: [String],
        default: [],
        select: false,
    },
    quantity: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    discount: {
        type: Number,
        default: 0,
    },
    buy_count: {
        type: Number,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

productSchema.index({ title: "text", type: "text" });

module.exports = mongoose.model("Products", productSchema);
