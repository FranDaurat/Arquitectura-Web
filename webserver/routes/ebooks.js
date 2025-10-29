const express = require('express');
const router = express.Router();
const ebooksController = require('../controllers/ebooksController');
const reviewsController = require('../controllers/reviewsController');

router.get('/', ebooksController.getAllEbooks);
router.get('/categories', ebooksController.getCategories);
router.get('/:id', ebooksController.getEbookById);
router.get('/:id/related', ebooksController.getRelatedEbooks);
router.get('/:id/reviews', reviewsController.getReviewsByEbook);
router.post('/:id/reviews', reviewsController.addReview);


module.exports = router;