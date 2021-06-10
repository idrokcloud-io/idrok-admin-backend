const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
    uz: {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        characteristics: [{}],
    },
    ru: {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        characteristics: [{}],
    },
    // type will changed
    type: {
        type: String,
    },
    slug: {
        type: String,
        unique: true,
    },
    car: {
        type: String
    },
    brand: {
        type: String
    },
    car_model: {
        type: String,
    },
    image: {
        type: String,
        required: true,
    },
    photos: [String],
    artikul: {
        type: String,
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

productSchema.pre("save", function (next) {
    this.slug = this.uz.title.split(" ").join("-");
    next();
});

productSchema.index({ "uz.title": "text", "ru.title": "text", type: "text" });

module.exports = mongoose.model("Products", productSchema);
