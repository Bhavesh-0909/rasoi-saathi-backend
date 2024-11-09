const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');

//configure
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: true, credentials: true }));
dotenv.config();

//routes




module.exports = app;