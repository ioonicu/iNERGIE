const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'charging_spots_db'
});

db.connect(err => {
    if (err) throw err;
    console.log('MySQL connected...');
});

// Endpoint pour obtenir toutes les pannes
app.get('/pannes', (req, res) => {
    const sql = 'SELECT * FROM pannes';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

// Endpoint pour obtenir tous les spots de recharge
app.get('/spots', (req, res) => {
    const sql = 'SELECT * FROM spots';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

// Endpoint pour ajouter une panne
app.post('/pannes', (req, res) => {
    const { type, description, date, system } = req.body;
    const sql = 'INSERT INTO pannes (type, description, date, `system`) VALUES (?, ?, ?, ?)';
    db.query(sql, [type, description, date, system], (err, results) => {
        if (err) throw err;
        res.send({ id: results.insertId, type, description, date, system });
    });
});

// Endpoint pour supprimer une panne
app.delete('/pannes/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM pannes WHERE id = ?';
    db.query(sql, [id], (err, results) => {
        if (err) throw err;
        res.send({ success: true });
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
