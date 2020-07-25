const express = require('express')
const router = express.Router()

const User = require('../Models/User')
const Artifact = require('../Models/Artifact')

router.get('/:id', (req, res) => {
    Artifact.findById(req.params.id)
    .then(artifact => {
        res.json(artifact)
    })
    .catch(err => console.log(`🚦 ${err} 🚦`))
})

router.post('/', (req, res) => {
    // TODO Change user to current user.
    User.findOne({ email: 'dave@dave.com' })
    .then(user => {
        Artifact.findOne({ name: req.body.name })
        .then(artifact => {
            if (artifact) {
                if (user.artifacts.includes(artifact._id)) {
                    res.send('Artifact already in favorites!')
                } else {
                    user.artifacts.push(artifact._id)
                    user.save()
                    res.send('Artifact added!')
                }
            } else {
                const newArtifact = new Artifact({
                    name: req.body.name,
                    description: req.body.description,
                    imageurl: req.body.imageurl
                })
                newArtifact.save()
                user.artifacts.push(newArtifact)
                user.save()
                .then(user => res.send('Artifact added!'))
                .catch(err => console.log(`🚦 ${err} 🚦`))
            }
        })
    })
})

// router.delete('/:id', (req, res) => {
//     Artifact.deleteOne({ _id: req.params.id })
//     .then(deleted => res.send(deleted))
//     .catch(err => console.log(`🚦 ${err} 🚦`))
// })

module.exports = router