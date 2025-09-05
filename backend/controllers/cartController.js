const UserModel = require('../models/UserModel');

exports.getCartData = async (req, res) => {
    try {
        const { userId } = req.body;
        const user = await UserModel.findOne({ _id: userId });
        return res.send({ success: true, message: "Cart data retrieved", cartData: user.cart });
    } catch (error) {
        return res.send({ success: false, message: error.message });
    }
};

exports.addToCart = async (req, res) => {
    try {
        const { book, username } = req.body;
        const user = await UserModel.findOne({ username });

        if (!user) return res.send({ success: false, message: "No user" });

        if (user.cart.some(item => item.bookId == book.bookId)) {
            return res.send({ success: false, message: "Book already present in the cart", number: 0 });
        }

        user.cart.push({...book, quantity: book.quantity, total: book.price*book.quantity});
        await user.save();

        return res.send({ success: true, message: 'Item added to cart', number: 1 });
    } catch (error) {
        return res.send({ success: false, message: error.message });
    }
};

exports.removeFromCart = async (req, res) => {
    try {
        const { bookId, userId } = req.body;
        const user = await UserModel.findOne({ _id: userId });

        user.cart = user.cart.filter(item => item.bookId !== bookId);
        await user.save();

        return res.send({ success: true, message: 'Item deleted from cart', cartData: user.cart });
    } catch (error) {
        return res.send({ success: false, message: error.message });
    }
};
