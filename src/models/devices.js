const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const deviceSchema = new Schema({
    _id: {
        type: mongoose.Types.ObjectId,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    updatedAt: {
        type: Date,
        required: true,
        default: () => Date.now(),
    },
    imgUrl: {
        type: String,
        required: true,
    },
});

const Device = mongoose.model('Devices', deviceSchema);
module.exports = Device;
