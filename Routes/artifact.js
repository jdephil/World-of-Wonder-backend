const express = require('express')
const axios = require('axios')

const router = express.Router()

const User = require('../Models/User')
const Artifact = require('../Models/Artifact')

// TODO Remove test route
router.post('/register', (req, res) => {
    User.findOne({ email: req.body.email })
    .then(user => {
        if (user) {
            res.send(user)
        } else {
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            })
            newUser.save()
            .then(user => res.json(user))
            .catch(err => console.log(err))
        }
    })
})

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
        .catch(err => console.log(`🚦 ${err} 🚦`))
    })
    .catch(err => console.log(`🚦 ${err} 🚦`))
})

router.delete('/:id', (req, res) => {
    User.update(
        { email: 'dave@dave.com' },
        { $pull: { artifacts: req.params.id} }
    )
    .then(res.send(`DELETED ${req.params.id}`))
    .catch(err => console.log(`🚦 ${err} 🚦`))
})

module.exports = router