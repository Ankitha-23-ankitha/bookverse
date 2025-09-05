
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();

mongoose.connect('mongodb://localhost:27017/BookStore');

app.use(express.json());

const allowedOrigins = [
  "https://bookverse-jade.vercel.app", // Replace with your actual frontend Vercel URL
  "http://localhost:3000" // Allow local development
];

app.use(
  cors({
    // origin: "https://book-verse-sigma.vercel.app",
    origin:"http://localhost:3000",
    credentials: true, // Allow cookies and authentication headers
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
  })
);


app.options("*", cors());

app.use('/auth', authRoutes);
app.use('/cart', cartRoutes);
app.use('/order', orderRoutes);

app.listen(3001, () => {
    console.log("Server running on port 3001");
});
