const express = require('express');
const router = express.Router();
const User = require("../Models/User")
const Journal = require('../Models/Journal');
const { db } = require('../Models/User');

//Show all journal entries
router.get('/', (req, res) => {
  db.User.findById({5f1c6cd7f4193e0fdeeecb91}).populate('journals').exec(function(err, user){
    console.log(user)
    res.send(user)
    })
    res.send(User.Journal)

// Add a new journal entry  
router.post('/', (req, res) => {
  db.User.findById({id: "5f1c6cd7f4193e0fdeeecb91"})
  .then(user => {
    const entry = new journal({ 
      title: "SnowShoe", 
      entry: "I did not realize that eskimo's used snowshoes. So cool!"
    })
    entry.save()
    user.journals.push(entry)
    user.save()
    .then(user => res.send("New journal entry added!"))
    .catch(error => console.log(`😵DANGER WILL ROBINSON DANGER: ${error}`))
  })
})

// //Edit a saved journal entry
router.put('/:id', (req, res) => {
  db.User.findById({5f1c6cd7f4193e0fdeeecb91}).populate('journals').exec(function(err, user){
    console.log(user.journal)
  })
  .populate('journal').exec()
  db.Journal.findOneAndUpdate({_id: req.params.id }, req.body, { new: true })
  .then(updatedEntry => {
    res.send(updatedEntry)
  })
  .catch(err => console.error(err))
})

// //Delete a saved artifact
router.delete('/:id', (req, res) => {
  db.Journal.findOneAndDelete({_id: req.params.id })
  .then(deletedEntry => {
    console.log(`You successfully deleted ${deletedEntry.title}`)
    res.send({message: 'Successful Deletion'})
  })
  .catch(error => console.error(error))
})

module.exports = router