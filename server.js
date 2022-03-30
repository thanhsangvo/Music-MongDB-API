const express = require('express');
const bodyParser = require('body-parser');
const { default: mongoose } = require('mongoose');
const app = express();

const Music = require('./models/music_model')

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }))
const MongoClient = require('mongodb').MongoClient

var url = 'mongodb://localhost:27017/SoundSleep';

mongoose.connect(url, {useNewUrlParser: true}).then((client) => {
    console.log('Connected to Database')
}).catch((err) => {
    console.log(err)
});

app.get('/', (req, res) => {
    Music.find({}, (error, music) => {
        // console.log(music)
        res.render('index.ejs', { quotes: music})
    })
})

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


// MongoClient.connect(url, { useUnifiedTopology: true }).then(client => {
//     console.log('Connected to Database')
//     const db = client.db('SoundSleep')
//     const quotesCollection = db.collection('Music')

//     // app.get('/', (req, res) => {
//     //     res.sendFile(__dirname + '/views/index.html')
//     // })

//     app.get('/', (req, res) => {
//         db.collection('Music').find().toArray()
//           .then(results => {
//             // console.log(results)
//             res.render('index.ejs', { quotes: results})
//           })
//           .catch(error => console.error(error))
          
//     })

//     app.post('/quotes', (req, res) => {
//         quotesCollection.insertOne(req.body).then(result => {
//             res.redirect('/')
//         })
//         .catch(error => console.error(error))
//     })
// })
// .catch(error => console.error(error))



app.listen(3000, function() {
    console.log('listening on 3000')
})