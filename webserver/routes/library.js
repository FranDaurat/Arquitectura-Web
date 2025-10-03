const express = require('express');
const router = express.Router();
const libraryController = require('../controllers/libraryController');

router.get('/', libraryController.getLibrary);           

module.exports = router;