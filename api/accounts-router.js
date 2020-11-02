const express = require('express')
const { update } = require('../data/dbConfig')

const db = require('../data/dbConfig')

const router = express.Router()

const Accounts = {
    get() {
        return db('accounts')
    },
    getById(id) {
        return db('accounts').where({ id }).first()
    },
    insert(account) {
        return db('accounts').insert(account)
    },
    update(id, account) {
        return db('accounts').where({ id }).update(account)
    }
}

router.get('/', (req, res) => {
    Accounts.get()
        .then(accounts => {
            res.status(200).json(accounts)
        })
        .catch(error => {
            res.status(500).json({ error: error.message })
        })
})

router.get('/:id', (req, res) => {
    Accounts.getById(req.params.id)
        .then(account => {
            res.status(200).json(account)
        })
        .catch(error => [
            res.status(500).json({ error: error.message })
        ])
})

router.post('/', (req, res) => {
    Accounts.insert(req.body)
        .then(([id]) => {
            return Accounts.getById(id)
        })
        .then(account => {
            res.status(201).json(account)
        })
        .catch(error => {
            res.status(500).json({ error: error.message })
        })
})

router.put('/:id', (req, res) => {
    Accounts.update(req.params.id, req.body)
        .then(updatedItems => {
            if (updatedItems === 1) {
                return Accounts.getById(req.params.id)
            } else if (updatedItems === 0) {
                res.status(404).json({ message: `Account with ID ${req.params.id} not found `})
            }
        })
        .then(account => {
            res.status(200).json(account)
        })
        .catch(error => {
            res.status(500).json({ error: error.message })
        })
})

module.exports = router