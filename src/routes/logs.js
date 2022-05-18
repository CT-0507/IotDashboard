const express = require('express');
const router = express.Router();

const logsController = require('../app/controllers/LogsController');

// newsController.index()

//router.get('/:slug', logsController.show);
router.get('/', logsController.index);

module.exports = router;
