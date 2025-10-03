const express = require('express');
const router = express.Router();
const libraryController = require('../controllers/libraryController');

router.get('/', libraryController.getLibrary);
router.post('/items', libraryController.addLibraryItem);
router.patch('/items/:itemId', libraryController.updateLibraryItem);
router.delete('/items/:itemId', libraryController.removeLibraryItem);
router.get('/tags', libraryController.getLibraryTags);
router.get('/favorites', libraryController.getLibraryFavorites);

module.exports = router;
