const express = require('express')

const db = require('../data/dbConfig')

const router = express.Router()

const Accounts = {
    get() {
        return db('accounts')
    },
    getById(id) {
        return db('accounts').where({ id }).first()
    },
    create(account) {
        return db('accounts').insert(account)
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

router.get('/:id', (req, res) => {
    Accounts.getById(req.params.id)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(error => [
            res.json(error)
        ])
})

router.post('/', (req, res) => {
    Accounts.create(req.body)
        .then(data => {
            res.json(data)
        })
        .catch(error => {
            res.json(error)
        })
})

module.exports = router