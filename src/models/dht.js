const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dhtSchema = mongoose.Schema({
    _id: {
        type: mongoose.Types.ObjectId,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    temp: {
        type: Number,
        required: true,
    },
    humi: {
        type: Number,
        required: true,
    },
    // change date
    createdAt: {
        type: Date,
        required: true,
        default: () => Date.now(),
    },
     // tham chiếu đền thiết bị mà sensor gắn vào,  có vẻ ko cần thiết

    // attachTo: {
    //     type: mongoose.Types.ObjectId,
    //     ref: 'Devices',
    // },
});

const DHT = mongoose.model('dht', dhtSchema);
module.exports = DHT;
