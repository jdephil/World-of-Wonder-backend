const express = require('express')
const axios = require('axios')

const router = express.Router()

const User = require('../Models/User')
const Artifact = require('../Models/Artifact')

router.get('/', (req, res) => {
    axios.get(`https://api.aucklandmuseum.com/id/humanhistory/object/${req.body.objectId}`)
    .then(response => {
        let resData = response.data
        res.json(resData)
    })
    .catch(err => console.log(`🚦 ${err} 🚦`))
})

router.get('/:id', (req, res) => {
    Artifact.findById(req.params.id)
    .then(artifact => {
        res.json(artifact)
    })
    .catch(err => console.log(`🚦 ${err} 🚦`))
})

router.post('/', (req, res) => {
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

router.delete('/:id', (req, res) => {
    User.update(
        { _id: req.user._doc._id },
        { $pull: { artifacts: req.params.id} }
    )
    .then(res.send(`DELETED ${req.params.id}`))
    .catch(err => console.log(`🚦 ${err} 🚦`))
})

module.exports = router