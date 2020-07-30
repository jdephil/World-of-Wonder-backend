const express = require('express');
const router = express.Router();

const User = require('../lib/Models/User')
const Artifact = require('../lib/Models/Artifact')

router.get('/', (req, res) => {
    User.findById(req.user._doc._id)
    .populate('artifacts')
    .exec((err, user) => {
        res.json(user.artifacts)
    })
})

router.get('/artifact/:id', (req, res) => {
    Artifact.findById(req.params.id)
    .then(artifact => {
        res.json(artifact)
    })
    .catch(err => console.log(`🚦 ${err} 🚦`))
})

router.post('/artifact', (req, res) => {
    User.findById(req.user._doc._id)
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
        .catch(err => console.log(`🚦 ${err} 🚦`))
    })
    .catch(err => console.log(`🚦 ${err} 🚦`))
})

router.delete('/artifact/:id', (req, res) => {
    User.update(
        { _id: req.user._doc._id },
        { $pull: { artifacts: req.params.id} }
    )
    .then(res.send(`DELETED ${req.params.id}`))
    .catch(err => console.log(`🚦 ${err} 🚦`))
})

// Export the Routes
module.exports = router