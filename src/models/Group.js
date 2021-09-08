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
    user: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
    }],
    numberOfStudents: {
        type: Number
    },
    type: {
        type: String,
        enum: ['monthly', 'daily'],
        default: 'daily'
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

module.exports = mongoose.model('Group', groupSchema)