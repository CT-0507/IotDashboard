const express = require('express');
const router = express.Router();

const mainController = require('../app/controllers/MainController');

// newsController.index()

//router.get('/:slug', mainController.show);
router.get('/', mainController.index);

module.exports = router;
