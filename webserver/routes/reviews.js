const express = require('express');
const router = express.Router();
const reviewsController = require('../controllers/reviewsController');

router.get('/', reviewsController.getAllReviews);
router.patch('/:reviewId', reviewsController.updateReview);
router.delete('/:reviewId', reviewsController.deleteReview);

module.exports = router;