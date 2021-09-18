const mongoose = require('mongoose')
const { Schema } = mongoose

const paymentSchema = new Schema({
    price: {
        type: Number,
        required: true
    },
    lesson: {
        type: Schema.Types.ObjectId,
        ref: 'Lesson'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    type: {
        type: String
    },
    month: {
        type: String
    },
    details: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

module.exports = mongoose.model('Payment', paymentSchema)