const mongoose = require('mongoose');
const DHT = require('../../models/dht.js');
const BH = require('../../models/bh.js');
var { Chart } = require('chart.js');
//import 'chartjs-adapter-luxon';
var ChartStreaming = require('chartjs-plugin-streaming');

Chart.register(ChartStreaming);

class ChartsController {
    // GET /
    async index(req, res, next) {
        var title = 'Charts';
        const dht = await DHT.findOne().sort({ updatedAt: -1 });
        const bh = await BH.findOne().sort({ updatedAt: -1 });
        let data = {
            temp: dht.temp,
            humi: dht.humi,
            lux: bh.lux,
        };
        res.render('charts/show', { data: data, title: title });
    }
    async getdata(req, res, next) {
        const dht = await DHT.findOne().sort({ createdAt: -1 });
        const bh = await BH.findOne().sort({ createdAt: -1 });
        let data = {
            temp: dht.temp,
            humi: dht.humi,
            lux: bh.lux,
        };
        res.json({ data: data });
    }
}

module.exports = new ChartsController();
