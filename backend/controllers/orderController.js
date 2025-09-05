const Stripe = require('stripe');
const OrderModel = require('../models/OrderModel');

require('dotenv').config();

const key = process.env.STRIPE_SECRET_KEY
const stripe = new Stripe(key);

exports.orderCOD = async (req, res) => {
    try {
        const { userId, books, address } = req.body;

        books.map(async book=>{

            const orderData = { 
                userId, 
                address, 
                item: book, 
                paymentMethod: 'COD', 
                payment: false, 
                date: Date.now(), 
                amount: book.price * book.quantity, 
                quantity: book.quantity 
            };
            
            const newOrder = new OrderModel(orderData);
            await newOrder.save();
        })

        res.send({ success: true, message: 'Order placed' });
    } catch (error) {
        res.send({ success: false, message: error.message });
    }
};

exports.orderStripe = async (req, res) => {
    try {
        const { userId, books, address } = req.body;
        const currency = 'inr';

        const orderIds = [];

        for (const book of books) {
            const newOrder = new OrderModel({
                userId,
                address,
                item: book,
                amount: book.price * book.quantity,
                paymentMethod: 'Stripe',
                payment: false,
                quantity: book.quantity,
                date: Date.now()
            });

            const savedOrder = await newOrder.save();
            orderIds.push(savedOrder._id);
        }

        const session = await stripe.checkout.sessions.create({
            success_url: `http://localhost:3000/bookverse/verify?success=true&orderIds=${orderIds.join(',')}`,
            cancel_url: `http://localhost:3000/bookverse/verify?success=false&orderIds=${orderIds.join(',')}`,
            line_items: books.map((book) => ({
                price_data: {
                    currency,
                    product_data: { name: book.bookName },
                    unit_amount: book.price * 100
                },
                quantity: book.quantity
            })),
            mode: 'payment'
        });

        return res.send({ success: true, session_url: session.url });
    } catch (error) {
        console.error("Stripe Order Error:", error.message);
        res.status(500).send({ success: false, message: error.message });
    }
};


exports.getOrders = async (req, res)=>{
    try {
        const {userId} = req.body
        const records = await OrderModel.find({userId})
        const orders = records.map(order=>{
            return{
                bookName: order.item.bookName,
                authorName: order.item.authorName,
                image: order.item.image,
                price: order.item.price,
                paymentMethod: order.paymentMethod,
                date: order.date.toString(),
                quantity: order.quantity,
                amount: order.amount
            }
        })
        return res.send({success: true, orders})
    } catch (err) {
        console.log(err.message)
    }
};