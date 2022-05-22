const express = require('express')
const mongoose = require('mongoose')
const Device = require('../models/devices')
const Router = express.Router()

// https://stackoverflow.com/questions/31549857/mongoose-what-does-the-exec-function-do
// https://mongoosejs.com/docs/timestamps.html


Router.patch('/device', (req, res) =>{
    _id = req.body._id // gửi với dạng String
    
    // Tạo filter tìm kiếm dựa trên các trường
    const filter = {_id: _id}
    console.log(`The _id you are query is: ${_id}`)


    // Code này sẽ chạy bất đồng bộ
    // {new: true}, trả về document SAU khi đã update dữ liệu,
    // {new: false}, trả về document TRC khi đã update dữ liệu, nghĩa là t thấy bản cũ của document
    Device.findOneAndUpdate(filter, {updatedAt: () => Date.now()},{new: true})
    .then(result => {
        console.log(result) // hiện thị document
        res.status(200).send(result)
    })
    .catch(err => {
        console.log('Có lỗi khi query: ')
        console.log(err)
        res.status(404).send(`Can't find device _id`)
    })


    // console.log('Hello')


})

module.exports = Router