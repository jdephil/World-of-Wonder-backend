const express = require('express')
const router = express.Router()

const User = require('../Models/User')
const Artifact = require('../Models/Artifact')


router.get('/:id', (req, res) => {
    Artifact.findById(req.params.id)
    .then(artifact => {
        res.send(artifact)
    })
    .catch(err => console.log(`🚦 ${err} 🚦`))
})

router.post('/', (req, res) => {
    // TODO Change user to current user.
    User.findOne({ email: 'test@test.com' })
    .then(user => {
        Artifact.findOne({ name: req.body.name })
        .then(artifact => {
            if (artifact) {
                res.send('Artifact already in collection!')
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

router.put('/', (req, res) => {

})

router.delete('/', (req, res) => {

})

module.exports = router