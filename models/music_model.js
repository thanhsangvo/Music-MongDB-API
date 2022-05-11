const { default: mongoose } = require('mongoose');

const musicSchema = new mongoose.Schema({
    name: String,
    musicURL: String,
    imgURL: String
})

const Music = mongoose.model('music', musicSchema); // Sang is Colotection

module.exports = Music

