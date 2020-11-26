const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const multer = require('multer');
const upload = multer();
const bodyParser = require('body-parser');
const MONGO_URI = config.get('MONGO_URI');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5000


const ships = require('./routes/ships');

app.use(express.json({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//app.use(upload.array());
const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI, { useUnifiedTopology: true, useNewUrlParser: true });
    } catch (err) {
        console.log(err)
    }

    console.log('connected to database');
}
connectDB();

app.use('/ships', ships);


//app.use(express.static('client/build'));
// app.get('*', (req, res) => {
//     console.log('in app.get(*) outside of production');
//     res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
//     console.log('in app.get(*) outside of production');
// });
// if (process.env.NODE_ENV === 'production') {
//     console.log('running production');
//     //SET STATIC FOLDER
//     app.use(express.static('client/build'));

//     app.get('*', (req, res, next) => {
//         res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
//     })
// }

app.listen(PORT, () => {
    console.log('Listening on port ' + PORT);
})