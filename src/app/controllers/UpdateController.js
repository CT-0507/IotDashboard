const mongoose = require('mongoose');
const DHT = require('../../models/dht.js');
const BH = require('../../models/bh.js');
const Device = require('../../models/devices.js');
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
    updateDht(req, res, next) {
        const data = new DHT({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            temp: req.body.temp,
            humi: req.body.humi,
            attachTo: req.body.attachTo,
        });
        data.save()
            .then((result) => {
                console.log(result);
                // console.log(result._id.toString())
                res.status(200).send(result._id.toString());
            })
            .catch((err) => {
                console.log(err);
                res.status(400).send(`Fail to update`);
            });
    }
    updateBh(req, res, next) {
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
        const device = new Device({
            _id: req.body.attachTo,
            name: 'Raspberry Pi',
            imgUrl: 'https://raspberrypi.vn/wp-content/uploads/2018/05/RaspberryPi-3-Model-B-Plus-coverfb.png',
        });
        Device.updateOne({ _id })
            .then(() => res.status(200).send('Ok'))
            .catch(next);
    }
}

module.exports = new UpdateController();
