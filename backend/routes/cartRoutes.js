const express = require('express');
const { getCartData, addToCart, removeFromCart } = require('../controllers/cartController');
const router = express.Router();

router.post('/getCartData', getCartData);
router.post('/addToCart', addToCart);
router.post('/removeFromCart', removeFromCart);

module.exports = router;
