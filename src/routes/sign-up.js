const express = require('express');
const router = express.Router();

const signUpController = require('../app/controllers/SignUpController');

// newsController.index()

//router.get('/:slug', logsController.show);
router.post('/', signUpController.signUp);
router.get('/', signUpController.index);

module.exports = router;
