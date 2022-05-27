const mongoose = require('mongoose');
const DHT = require('../../models/dht.js');
const BH = require('../../models/bh.js');
const Device = require('../../models/devices.js');
const Log = require('../../models/log.js');
const {
    mongooseToObject,
    multipleMongooseToObject,
} = require('../../util/mongoose');
class UpdateController {
    // GET

    async addDevice(req, res, next) {
        const data = new Device({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            imgUrl: req.body.imgUrl,
        });
        console.log(data);
        data.save()
            .then((result) => {
                console.log(result);
                console.log(result._id.toString());
                // send this
                res.status(200).send(result._id.toString());
                // res.status(200).json(result)
            })
            .catch((err) => {
                console.log(err);
                res.status(400).send(`Fail to update`);
            });
    }
    async updateDht(req, res, next) {
        const data = new DHT({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            temp: req.body.temp,
            humi: req.body.humi,
            attachTo: req.body.attachTo,
        });
        data.save()
            .then((result) => {
                //console.log(result);
                // console.log(result._id.toString())
                //res.status(200).send(result._id.toString());
            })
            .catch((err) => {
                console.log(err);
                res.status(400).send(`Fail to update`);
                return;
            });
        // Lấy dữ liệu từ database
        const devicesInfo = await Device.findOne({ _id: req.body.attachTo });
        var deviceName = devicesInfo.name;
        const log1 = new Log({
            _id: new mongoose.Types.ObjectId(),
            deviceId: req.body.attachTo,
            ip: req.body.ip,
            name: deviceName,
            sensor: 'Nhiệt độ',
            value: parseInt(req.body.temp),
        });
        log1.save()
            .then(() => {
                console.log(log1);
                //res.send(log)
            })
            .catch(() => {
                res.send('Failed to create');
                return;
            });
        const log2 = new Log({
            _id: new mongoose.Types.ObjectId(),
            deviceId: req.body.attachTo,
            ip: req.body.ip,
            name: deviceName,
            sensor: 'Độ ẩm',
            value: parseInt(req.body.humi),
        });
        log2.save()
            .then(() => {
                res.status(200).send('Ok');
            })
            .catch(() => {
                res.send('Failed to create');
            });
    }
    async updateBh(req, res, next) {
        const data = new BH({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            lux: req.body.lux,
            attachTo: req.body.attachTo,
        });
        data.save()
            .then((result) => {
                console.log(result);
                console.log(result._id.toString());

                // res.status(200).send(result._id.toString())
            })
            .catch((err) => {
                console.log(err);
                //res.status(400).send(`Fail to update`)
            });
        const devicesInfo = await Device.findOne({ _id: req.body.attachTo });
        var deviceName = devicesInfo.name;
        const log = new Log({
            _id: new mongoose.Types.ObjectId(),
            deviceId: req.body.attachTo,
            ip: req.body.ip,
            name: deviceName,
            sensor: ' Độ sáng',
            value: req.body.lux,
        });
        log.save()
            .then(() => {
                res.send(log);
            })
            .catch(() => {
                res.send('Failed to create');
            });
    }
    loging(req, res, next) {
        const log = new Log({
            _id: new mongoose.Types.ObjectId(),
            deviceId: req.body.attachTo,
            ip: req.body.ip,
            name: req.body.name,
            sensor: req.body.sensor,
            value: req.body.value,
        });
        log.save()
            .then(() => {
                res.send(log);
            })
            .catch(() => {
                res.send('Failed to create');
            });
    }
}

module.exports = new UpdateController();
