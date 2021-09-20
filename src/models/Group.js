const mongoose = require('mongoose')
const { Schema } = mongoose

const groupSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        default: 'daily',
        enum: ['daily', 'monthly']
    },
    start: {
        type: Date,
        default: Date.now,
    },
    price: {
        type: Number
    },
    details: {
        type: String
    },
    teacher: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    lesson: {
        type: Schema.Types.ObjectId,
        ref: 'Lesson'
    },
    students: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
    }],
    dates: [
        [
            {
                type: Date
            }
        ]
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

module.exports = mongoose.model('Group', groupSchema)