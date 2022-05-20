const express = require('express');
const router = express.Router();

const logsController = require('../app/controllers/LogsController');

// newsController.index()

//router.get('/:slug', logsController.show);
router.get('/', logsController.show);
router.get('/:page', logsController.show);

module.exports = router;
