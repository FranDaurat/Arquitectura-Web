const express = require('express');
const router = express.Router();
const checkoutController = require('../controllers/checkoutController');

router.post('/', checkoutController.checkout);
router.post('/confirm', checkoutController.confirmCheckout);

module.exports = router;