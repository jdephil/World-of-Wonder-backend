const express = require('express')
const router = express.Router()

const User = require('../Models/User')
const Artifact = require('../Models/Artifact')

router.post('/', (req, res) => {
    // TODO Change user to current user.
    User.findOne({ email: 'test@test.com' })
    .then(user => {
        Artifact.findOne({ name: req.body.name })
        .then(artifact => {
            if (artifact) {
                res.send('Already in collection!')
            } else {
                const newArtifact = new Artifact({
                    name: req.body.name,
                    description: req.body.description,
                    imageurl: req.body.imageurl
                })
                newArtifact.save()
                user.artifacts.push(newArtifact)
                user.save()
                .then(user => res.json(user))
                .catch(err => console.log(err))
            }
        })
    })
})

module.exports = router