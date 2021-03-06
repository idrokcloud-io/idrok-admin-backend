const mongoose = require("mongoose");
const { Schema } = mongoose;

const _ = require("lodash");
const jwt = require("jsonwebtoken");
require("dotenv/config");

const userSchema = new Schema({
    fullName: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
        unique: true,
    },
    isPaid: {
        type: String,
        default: "unpaid"
    },
    attendance: [{
        date: {
            type: Date,
            default: Date.now
        },
        participated: {
            type: Boolean,
            default: false
        }
    }],
    payment: [{
        start: {
            type: Date
        },
        end: {
            type: Date
        },
        paymentDate: {
            type: Date
        },
        status: {
            type: String
        },
        sum: {
            type: Number
        }
    }],
    role: {
        type: String,
        default: "student",
        enum: ['admin', 'teacher', 'student']
    },
    profession: {
        type: String
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

userSchema.index({ phone: "text" });

const jwtPrivateKey = `jwtPrivateKey`;
userSchema.methods.genToken = function () {
    const token = jwt.sign(
        _.pick(this, ["_id", "fullName", "phone", "role", "profession"]),
        jwtPrivateKey
    );
    return token;
};

userSchema.methods.toJSON = function () {
    var obj = this.toObject();
    delete obj.password;
    return obj;
};

module.exports = mongoose.model("User", userSchema);
