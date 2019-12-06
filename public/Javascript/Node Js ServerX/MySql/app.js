const express = require('express');
const mysql = require('mysql');

// Create connection
const db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'YOUR_PASSWORD',
    database : 'YOUR_DATABASE_NAME'
});

// Database connection
db.connect((err) => {
    if(err){
        throw err;
    }
    console.log('MySql Connected...');
});

const app = express();


// insert operation
app.get('/insertUser', (req, res) => {
    let post = {name:'David', lastName:'trump'};
    let sql = 'INSERT INTO User SET ?';
    let query = db.query(sql, post, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('User data added successfully.');
    });
});

const port = process.env.port || 5000;

app.listen(port, () => {
    console.log('Server started on port 5000');
});