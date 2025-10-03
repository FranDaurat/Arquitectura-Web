const express = require('express');
const router = express.Router();
const ebooksController = require('../controllers/ebooksController');

router.get('/', ebooksController.getAllEbooks);
router.get('/categoriaes', ebooksController.getCategories);
router.get('/:id', ebooksController.getEbookById);
router.get('/:id/related', ebooksController.getRelatedEbooks);


module.exports = router;