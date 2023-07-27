const { default: mongoose } = require("mongoose");

const rivewSchema = mongoose.Schema({
    id: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    comment: {
        type: String,
        require: true
    },
    createOn: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Rivew', rivewSchema);