const { default: mongoose } = require("mongoose");

const destinaitonSchema = mongoose.Schema({
    id: {
        type: String,
        require: true
    },
    title: {
        type: String,
        require: true
    },
    rating: {
        type: String,
        require: true
    },
    duration: {
        type: String,
        require: true
    },
    opening: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    image1: {
        type: String,
        require: true
    },
    image2: {
        type: String,
        require: true
    },
    image3: {
        type: String,
        require: true
    },
    createdOn: {
        type: Date,
        default: Date.now
    },
})

module.exports = mongoose.model('Destination', destinaitonSchema)