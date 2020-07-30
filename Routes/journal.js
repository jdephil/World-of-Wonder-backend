const express = require('express');
const router = express.Router();
const User = require("../lib/Models/User")

//Show all journal entries /// WORKING CORRECTLY DON'T MESS
router.get('/', (req, res) => {
  User.findById(req.user._doc._id)
    .then(user => {
      console.log(user.journalEntries)
      res.json(user.journalEntries)
  })
  .catch(error => res.send(error))
})

//Show one journal entry
router.get('/:id', (req, res) => {
  User.findById(req.user._doc._id)
  .then(user => {
    let displayedEntry = user.journalEntries.id(req.params.id)
    res.json(displayedEntry)
  })
  .catch(error => res.send(error))
})

//create a journal entry /// WORKING CORRECTLY DON'T MESS WITH IT
router.post('/', (req, res) => {
  User.findById(req.user._doc._id)
  .then(user => {
    console.log(user)
    user.journalEntries.push({ 
      title: req.body.title, 
      entry: req.body.entry
    });
    user.save()
    .then(user => res.json(user))
  })
  .catch(error => res.send(`😵DANGER WILL ROBINSON DANGER: ${error}`))
})

////Edit a saved journal entry //// THIS IS WORKING CORRECTLY DON'T MESS
router.put('/:id', (req, res) => {
  User.findById(req.user._doc._id)
    .then(user => {
      var newEntry = user.journalEntries.id(req.params.id)
      newEntry.title = req.body.title
      newEntry.entry = req.body.entry
      user.save()
      console.log(user)
      res.json(newEntry)
    })
    .catch(error => res.send(error))
})


// // //Delete a saved journal entry
router.delete('/:id', (req, res) => {
  User.findById(req.user._doc._id)
    .then(user => {
      user.journalEntries.id(req.params.id).remove()
      user.save()
      res.json(user)
    })
    .catch(error => res.send(error))
})
  
module.exports = router