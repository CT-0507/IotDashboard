const express = require('express');
const router = express.Router();

const chartsController = require('../app/controllers/ChartsController');

// newsController.index()

//router.get('/:slug', chartsController.show);
router.get('/get-data', chartsController.getdata);
router.get('/', chartsController.index);

module.exports = router;
