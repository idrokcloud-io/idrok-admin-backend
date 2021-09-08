const mongoose = require('mongoose')
const { Schema } = mongoose

const lessonSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

module.exports = mongoose.model('Lesson', lessonSchema)