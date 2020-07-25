const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const app = express()

const db = 'mongodb://localhost:27017/worldofwonder'
mongoose.connect(db).then((() => console.log('MONGOOSE CONNECTED'))).catch(err => console.log(err))

const artifact = require('./Routes/artifact')

const User = require('./Models/User')

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send('Hello, world!')
})

app.post('/register', (req, res) => {
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

app.use('/artifact', artifact)

app.listen(5000, () => console.log('LISTENING'))