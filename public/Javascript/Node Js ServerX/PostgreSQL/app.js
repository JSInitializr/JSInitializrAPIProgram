const express = require('express');
const { Client } = require('pg')

const client = new Client({
    user: "postgres",
    password: "postgres",
    host: "husseinmac",
    port: 5432,
    database: "husseindb"
})

client.connect()
    .then(() => console.log("Connected successfuly"))
    .then(() => client.query("select * from employees where name = $1", ["Edmond"]))
    .then(results => console.table(results.rows))
    .catch(e => console.log(e))
    .finally(() => client.end())

const app = express();

// insert operation
app.get('/insertUser', (req, res) => {
    let sql = 'INSERT INTO User name=';
    client.query(sql)
        .then(result => {
            res.send('User data added successfully.');
        })
        .catch(e => {
            res.send('Not added successfully, something went wrong', e);
        })

});

const port = process.env.port || 5000;

app.listen(port, () => {
    console.log('Server started on port 5000');
});