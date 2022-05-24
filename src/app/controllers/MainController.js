const mongoose = require('mongoose');
const DHT = require('../../models/dht.js');
const BH = require('../../models/bh.js');
const host = require('../../index')
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
        console.log(host);
        res.render('main/show', { data: data, title: title, host: '172.31.250.62' });
    }
}

module.exports = new MainController();
