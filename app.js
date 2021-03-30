const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const port = 3000;

const app = express();

const eventRoutes = require('./routes/event');
const eventModel = require('./models/event');

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
})
app.use((req, res, next) => {
    next();
})
app.use(eventRoutes);

mongoose
    .connect('mongodb+srv://Shivangi:1234@cluster0.mz5jj.mongodb.net/test?authSource=admin&replicaSet=atlas-12n7k3-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true')
    .then(result => {
        app.listen(port);
        console.log('Server starts running on port '+port);
    })
    .catch((err) => {
        console.log(err);
    })