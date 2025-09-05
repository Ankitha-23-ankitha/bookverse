const mongoose = require('mongoose')


const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    cart: [
        {
            bookId:{
                type: String,   
            },
            bookName: String,
            subtitle: String,
            authorName: String,
            date: String,
            price: Number,
            image: String,
            description: String,
            category: String,
            rating: Number,
            pageCount: Number,
            publisher: String,
            publishedData: String,
            quantity: Number,
            total: Number
        }
    ]
})

const UserModel = new mongoose.model('users', UserSchema)

module.exports = UserModel