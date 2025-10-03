const express = require('express');
const router = express.Router();
const reviewsController = require('../controllers/reviewsController');

router.post('/:id/reviews', reviewsController.addReview);
router.get('/:id/reviews', reviewsController.getReviewsByEbook);

module.exports = router;