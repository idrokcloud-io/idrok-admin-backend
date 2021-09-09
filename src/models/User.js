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
        type: Boolean,
        default: false
    },
    payCreatedDate: {
        type: Date,
        default: Date.now,
    },
    paySum: {
        type: Number
    },
    // groups: [
    //     {
    //         type: Schema.Types.ObjectId,
    //         ref: 'Group'
    //     }
    // ],
    attendance: {
        type: [String]
    },
    role: {
        type: String,
        default: "student",
        enum: ['admin', 'teacher', 'student']
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

const jwtPrivateKey = `qweroiujasdkfqwuihasjdchka`;
userSchema.methods.genToken = function () {
    const token = jwt.sign(
        _.pick(this, ["_id", "fullName", "phone", "role"]),
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
