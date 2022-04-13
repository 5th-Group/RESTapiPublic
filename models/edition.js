// Dependencies
const mongoose = require('mongoose')

const editionSchema = mongoose.Schema({
    type: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model('editions', editionSchema)