const mongoose = require('mongoose')


const OrderSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        trim: true
    },
    item: {
        type: Object,
        required: true,
        trim: true
    },
    quantity:{
        type: Number,
        required: true
    },
    address: {
        type: Object,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    paymentMethod: {
        type: String,
        required: true
    },
    payment: {
        type: Boolean,
        default: false
    },
    date: {
        type: Date,
    }

})

const OrderModel = new mongoose.model('orders', OrderSchema)

module.exports = OrderModel