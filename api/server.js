const express = require("express");

const AccountRouter = require('./accounts-router')

const db = require("../data/dbConfig.js");

const server = express();

server.use(express.json());

server.use('/accounts', AccountRouter)

server.get('/', (req, res) => {
    res.status(200).json({ API: 'UP' })
})

module.exports = server;
