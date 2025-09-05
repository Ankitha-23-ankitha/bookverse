const express = require('express');
const { orderCOD, orderStripe, getOrders } = require('../controllers/orderController');
const router = express.Router();

router.post('/cod', orderCOD);
router.post('/stripe', orderStripe);
router.post('/getOrders', getOrders);

module.exports = router;
