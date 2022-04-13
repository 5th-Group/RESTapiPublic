// Dependencies
const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    pageCount: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    language: {
        type: String,
        required: true,
    },
    edition: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'editions'
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    publishDate: {
        type: Date,
        required: true,
    },
    isbn: {
        type: String,
    },
})

module.exports = mongoose.model('books', bookSchema)