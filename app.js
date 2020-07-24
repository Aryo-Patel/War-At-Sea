const express = require('express');
const mongoose = require('mongoose');
const config = require('config');

const MONGO_URI = config.get('MONGO_URI');

const app = express();
const PORT = process.env.PORT || 5000


const ships = require('./routes/ships');

app.use(express.json({ extended: false }));

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
app.listen(PORT, () => {
    console.log('Listening on port ' + PORT);
})