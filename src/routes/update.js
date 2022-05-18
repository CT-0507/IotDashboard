const express = require('express');
const router = express.Router();
const DHT = require('../models/dht.js')
const Device = require('../models/devices.js');
const mongoose  = require('mongoose');

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
router.post('/device', (req, res) => {
    const device  = new Device({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        imgUrl: req.body.imgUrl
    })

    device.save()
        .then((result) => {
            console.log(result)
            console.log(result._id.toString())
            // send this
            res.status(200).send(result._id.toString())
            // res.status(200).json(result)
        })
        .catch(err => {
            console.log(err)
            res.status(400).send(`Fail to update`)
        })
})


router.post('/dht', (req, res)=>{
    const dht = new DHT({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        temp: req.body.temp,
        humi: req.body.humi,
    })
    dht.save()
    .then((result) => {
        console.log(result)
        console.log(result._id.toString())
        // trả về id của của document dạng string
        res.status(200).send(result._id.toString())
        // res.status(200).json(result)
    })
    .catch(err => {
        console.log(err)
        res.status(400).send(`Fail to update`)
    })
})

router.post('/bh', (req, res)=>{
    const bh = new DHT({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        lux: req.body.lux,
    })
    bh.save()
    .then((result) => {
        console.log(result)
        console.log(result._id.toString())
        // trả về id của của document dạng string
        res.status(200).send(result._id.toString())
        // res.status(200).json(result)
    })
    .catch(err => {
        console.log(err)
        res.status(400).send(`Fail to update`)
    })
})
module.exports = router