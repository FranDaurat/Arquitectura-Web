const express = require('express');
const router = express.Router();
const reviewsController = require('../controllers/reviewsController');

router.post('/:id/reviews', reviewsController.addReview);
router.get('/:id/reviews', reviewsController.getReviewsByEbook);
router.patch('/:reviewId', reviewsController.updateReview);
router.delete('/:reviewId', reviewsController.deleteReview);

module.exports = router;