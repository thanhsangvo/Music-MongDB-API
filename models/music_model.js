const { default: mongoose } = require('mongoose');

const musicSchema = new mongoose.Schema({
    name: String,
    musicURL: String,
    imgURL: String
})

const Music = mongoose.model('Sang', musicSchema); // Sang is Colotection

module.exports = Music