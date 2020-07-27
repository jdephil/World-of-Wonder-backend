const express = require('express');
const router = express.Router();
const User = require("../Models/User")

//Show all journal entries /// WORKING CORRECTLY DON'T MESS
router.get('/', (req, res) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      console.log(user.journalEntries)
      res.json(user.journalEntries)
  })
  .catch(error => console.log(error))
})

//Show one journal entry
router.get('/:id', (req, res) => {
  User.findOne({ email: req.body.email })
  .then(user => {
    let displayedEntry = user.journalEntries.id(req.params.id)
    res.json(displayedEntry)
  })
})

//create a journal entry /// WORKING CORRECTLY DON'T MESS WITH IT
router.post('/', (req, res) => {
  User.findOne({ email: req.body.email })
  .then(user => {
    console.log(user)
    user.journalEntries.push({ 
      title: req.body.title, 
      entry: req.body.entry
    });
    user.save()
    .then(user => res.json(user))
  })
  .catch(error => console.log(`😵DANGER WILL ROBINSON DANGER: ${error}`))
})

////Edit a saved journal entry //// THIS IS WORKING CORRECTLY DON'T MESS
router.put('/', (req, res) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      var newEntry = user.journalEntries.id(req.body.id)
      newEntry.title = req.body.title
      newEntry.entry = req.body.entry
      user.save()
      console.log(user)
      res.json(newEntry)
    })
})


// // //Delete a saved artifact
router.delete('/', (req, res) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      user.journalEntries.id(req.body.id).remove()
      user.save()
      res.json(user)
    })
})
  
module.exports = router