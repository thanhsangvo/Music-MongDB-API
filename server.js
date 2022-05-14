const express = require('express');
const bodyParser = require('body-parser');
const { default: mongoose } = require('mongoose');
const app = express();

const Music = require('./models/music_model');
const { Int32 } = require('mongodb');

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json())

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
mongoose.connect(URI,
    err => {
        if (err) throw err;
        console.log('connected to MongoDB')
    }
);

app.get('/', (req, res) => {
    Music.find({}, (error, music) => {
        // console.log(music)
        res.render('index.ejs', { quotes: music })
    }).sort({ id: 1 })
}
)

app.post('/addData', (req, res) => {
    const music = new Music({
        id: req.body.id,
        name: req.body.name,
        musicURL: req.body.musicURL,
        imgURL: req.body.imgURL,
    })

    music.save((error, newMuic) => {
        if (error) {
            console.log(error)
        } else {
            // console.log(newMuic)
            // res.status(200).json(newMuic)
            res.redirect('/')
        }
    })
})

app.get('/fetchAll', (req, res) => {
    Music.find({}, (error, music) => {
        // console.log(music)
        res.json(music)
    })
})

app.get('/search/:id', (req, res) => {
    const query = { id: parseInt(req.params.id) };

    Music.findOne(query, (error, music) => {
        res.json(music);
    })
})

app.post('/edit', (req, res) => {

    const query = { id: req.body.id }
    res.json(query.id)
})

app.get('/edit/:id', (req, res) => {
    const query = { id: parseInt(req.params.id) };
    Music.findOne(query, (error, music) => {
        res.render('edit.ejs', { quotes: music })
    })
})

app.put('/update', (req, res) => {
    // console.log(req.body)
    Music.findOneAndUpdate(
        { id: req.body.id },
        {
            $set: {
                id: req.body.id,
                name: req.body.name,
                musicURL: req.body.musicURL,
                imgURL: req.body.imgURL,
            }
        },
        {
            upsert: true
        }
    )
        .then(result => {
            res.json('Tao đã cập nhật')
        })
        .catch(error => console.error(error))
})

app.delete('/delete', (req, res) => {
    const query = { name: req.body.name };
    // console.log(query);
    Music.deleteOne(query).then(result => {
        res.json('Deleted Success')
    })
        .catch(error => console.error(error))
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
