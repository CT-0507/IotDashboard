const express = require('express');
const router = express.Router();

const logsController = require('../app/controllers/LogsController');

// newsController.index()

//router.get('/:slug', logsController.show);
router.delete('/:id', logsController.destroy);
router.get('/filter', logsController.filter);
router.get('/filter/:page', logsController.filter);
router.get('/', logsController.show);

module.exports = router;
