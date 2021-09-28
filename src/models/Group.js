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
        type: String,
    },
    end: {
        type: String,
    },
    price: {
        type: Number
    },
    details: {
        type: String
    },
    firstLessonDate: {
        type: Date
    },
    isOdd: {
        type: Boolean
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
                type: String
            }
        ]
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

module.exports = mongoose.model('Group', groupSchema)