const express = require('express');
const router = express.Router();

const loginController = require('../app/controllers/LoginController');

// newsController.index()

//router.get('/:slug', logsController.show);
router.post('/login', loginController.login);
router.get('/', loginController.index);

module.exports = router;
