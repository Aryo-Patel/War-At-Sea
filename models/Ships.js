const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ShipSchmea = new Schema({
    name: {
        type: String,
        required: true
    },
    number_available: {
        type: Number,
        required: true
    },
    nation: {
        type: String,
        required: true
    },
    points: {
        type: Number,
        required: true
    }
});

const Ship = mongoose.model('ship', ShipSchmea);
module.exports = Ship;