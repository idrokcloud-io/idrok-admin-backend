const mongoose = require('mongoose')
const { Schema } = mongoose

const paymentSchema = new Schema({
    name: {
        type: String,
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
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

module.exports = mongoose.model('Payment', paymentSchema)