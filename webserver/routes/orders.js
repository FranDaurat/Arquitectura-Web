const express = require('express');
const router = express.Router();
const ordersController = require('../controllers/ordersController');

router.get('/:orderId', ordersController.getOrderById);

module.exports = router
