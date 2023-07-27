const { default: mongoose } = require("mongoose");

const userSchema = mongoose.Schema({
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
    role: {
        type: String,
        require: true
    },
    photo: {
        type: String,
        require: true
    },
    createdOn: {
        type: Date,
        default: Date.now
    },
})

module.exports = mongoose.model('User', userSchema)