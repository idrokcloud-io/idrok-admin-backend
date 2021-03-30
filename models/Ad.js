const mongoose = require("mongoose");
const { Schema } = mongoose;

const adSchema = new Schema({
    uz: {
        title: {
            type: String,
        },
        description: {
            type: String,
        },
    },
    ru: {
        title: {
            type: String,
        },
        description: {
            type: String,
        },
    },
    image: {
        type: String,
    },
    type: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Ads", adSchema);
