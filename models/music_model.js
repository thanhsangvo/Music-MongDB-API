const { Int32 } = require('mongodb');
const { default: mongoose } = require('mongoose');

const musicSchema = new mongoose.Schema({
    id: Number,
    name: String,
    musicURL: String,
    imgURL: String
})

const Music = mongoose.model('music', musicSchema); // Sang is Colotection

module.exports = Music

