const express = require('express');
const router = express.Router();

const updateController = require('../app/controllers/UpdateController');

/*
Code vẫn chưa hoàn chỉnh, nên tách các chức năng thành 1 file controller riêng

*/

// http://192.168.0.12:3000/update/device
/*
    {
        "name": "wemos",
        "imgUrl":"wemos.jpg"
    }
*/
router.post('/dht', updateController.updateDht);
router.post('/bh', updateController.updateBh);
router.post('/device', updateController.addDevice);

module.exports = router;
