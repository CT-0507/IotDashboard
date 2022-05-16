const express = require('express');
const router = express.Router();

const dashboardController = require('../app/controllers/dashboardController');

// newsController.index()

//router.get('/:slug', dashboardController.show);
router.get('/', dashboardController.index);

module.exports = router;
