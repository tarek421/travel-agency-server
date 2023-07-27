const { default: mongoose } = require("mongoose");

const orderSchema = mongoose.Schema({
    id: {
        type: String,
        require: true
    },
    destinationName: {
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
    phone: {
        type: Number,
        require: true
    },
    address: {
        type: String,
        require: true
    },
    city: {
        type: String,
        require: true
    },
    postalCode: {
        type: Number,
        require: true
    },
    state: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    adultPerson: {
        type: Number,
        require: true
    },
    childPerson: {
        type: Number,
        require: true
    },
    comment: {
        type: String
    },
    createdOn: {
        type: Date,
        default: Date.now
    },
})

module.exports = mongoose.model('Order', orderSchema)