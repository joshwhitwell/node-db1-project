const express = require('express')

const db = require('../data/dbConfig')

const router = express.Router()

const Accounts = {
    get() {
        return db('accounts')
    }
}

router.get('/', (req, res) => {
    Accounts.get()
        .then(data => {
            res.json(data)
        })
        .catch(error => {
            res.json(error)
        })
})

module.exports = router