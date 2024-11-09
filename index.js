const express = require('express');
const app = require('./app');
const connectDB = require('./config/mongodb');

const port = process.env.PORT || 8000;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

connectDB();