const express = require('express');
const bodyParser = require('body-parser');
const { default: mongoose } = require('mongoose');
const app = express();

const Music = require('./models/music_model')

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }))

const MongoClient = require('mongodb').MongoClient

// var url = 'mongodb://localhost:27017/SoundSleep'; // local
// mongoose.connect(url, {useNewUrlParser: true}).then((client) => {
//     console.log('Connected to Database')
// }).catch((err) => {
//     console.log(err)
// });

const username = "devsang";
const password = "sangne";
const cluster = "cluster0.u9hir";
const dbname = "SoundSleep";

const URI = `mongodb+srv://${username}:${password}@${cluster}.mongodb.net/${dbname}?retryWrites=true&w=majority`;
const uri = process.env.MONGODB_URI;

// console.log(URI);
mongoose.connect(uri,
    err => {
        if(err) throw err;
        console.log('connected to MongoDB')
    }
);

app.get('/', (req, res) => {
    
        Music.find({}, (error, music) => {
            // console.log(music)
            res.render('index.ejs', { quotes: music})
        })
    }
)

app.post('/quotes', (req, res) => {

    const music = new Music({
        name: req.body.name,
        musicURL: req.body.musicURL,
        imgURL: req.body.imgURL,
    })

    music.save((error, newMuic) => {
        if (error) {
            console.log(error)
        } else {
            console.log(newMuic)
            // res.status(200).json(newMuic)
            res.redirect('/')
        }
    })
})

app.get('/fetchAll', (req, res) => {
    Music.find({}, (error, music) => {
        console.log(music)
        res.json(music)
    })
})


app.listen(3000, function() {
    console.log('listening on 3000')
})