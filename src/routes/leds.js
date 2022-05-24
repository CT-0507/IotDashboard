const express = require('express');
const router = express.Router();

const ledsController = require('../app/controllers/LedsController');

router.post('/', ledsController.leds)
router.post('/led1', ledsController.led1);
router.post('/led2', ledsController.led2);

module.exports = router;
