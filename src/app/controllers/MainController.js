const mongoose = require('mongoose');
const DHT = require('../../models/dht.js');
const BH = require('../../models/bh.js');
class MainController {
    // GET

    async index(req, res, next) {
        const dht = await DHT.findOne().sort({ createdAt: -1 });
        const bh = await BH.findOne().sort({ createddAt: -1 });
        console.log(dht);
        let data = {
            temp: dht.temp,
            humi: dht.humi,
            lux: bh.lux,
        };
        console.log(data);
        var title = 'Main';
        res.render('main/show', { data: data, title: title });
    }
}

module.exports = new MainController();
