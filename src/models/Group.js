const mongoose = require('mongoose')
const { Schema } = mongoose

const groupSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    lesson: {
        type: Schema.Types.ObjectId,
        ref: 'Lesson'
    },
    details: {
        type: String
    },
    teacher: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    students: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
    }],
    price: {
        type: Number
    },
    start: {
        type: Date,
        default: Date.now,
    },
    end: {
        type: Date,
        default: Date.now,
    },
    type: {
        type: String,
        default: 'daily'
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

module.exports = mongoose.model('Group', groupSchema)