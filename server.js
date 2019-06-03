const express = require('express');

const actions = require('./data/accounts-model.js');

const server = express();

server.use(express.json());

server.get('/accounts/', (req, res) => {
  actions.find()
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).json({ message: "oh dear. something has gone wrong." }))
})

server.get('/accounts/:id', (req, res) => {
  const id = req.params.id;
  actions.findById(id)
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).json({ message: "oh dear. something has gone wrong." }))
})

server.post('/accounts', (req, res) => {
  const account = req.body;
  actions.add(account)
  .then(data => res.status(201).json(data))
  .catch(err => res.status(500).json({ message: "oh dear. something has gone wrong." }))
})

server.delete('/accounts/:id', (req, res) => {
  const id = req.params.id;
  actions.remove(id)
    .then(data => res.status(204).json({ message: "account deleted" }))
    .catch(err => res.status(500).json({ message: "oh dear. something has gone wrong." }))
})

server.put('/accounts/:id', (req, res) => {
  const id = req.params.id;
  const changes = req.body;
  actions.update(id, changes)
    .then(data => res.status(200).json({ message: "account updated" }))
    .catch(err => res.status(500).json({ message: "oh dear. something has gone wrong." }))
})
  
  

module.exports = server;