const express = require('express');
const mongoose = require('mongoose')
const db = require('./db').database;
const app = express();

mongoose.connect(db)
    .then(() => {
        console.log('Monbodb connected');
    }).catch((err) => {
        console.log('Unable to connect', err);
    });


const port = process.env.port || 5000;

app.get('/', (req, res) => {
    res.send('<h1>hello world</h1>');
});

app.listen(port, () => {
    console.log('server is listtening');
})



