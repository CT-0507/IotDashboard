const express = require('express');
const router = express.Router();

const updateController = require('../app/controllers/UpdateController');


router.post('/log', updateController.loging); // POST update/log
router.post('/dht', updateController.updateDht); // POST update/dht
router.post('/bh', updateController.updateBh); // POST update/bh
router.post('/device', updateController.addDevice); // POST update/device

module.exports = router;
