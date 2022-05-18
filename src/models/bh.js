const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bhSchema = new Schema({
    _id: {
        type: mongoose.Types.ObjectId,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    lux: {
        type: Number,
        required: true,
    },
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

const BH = new mongoose.model('bh', bhSchema);
module.exports = BH;
