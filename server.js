const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const User = require("./Models/User")

const db = 'mongodb://localhost:27017/worldofwonder'
mongoose.connect(db).then((() => console.log('MONGOOSE CONNECTED'))).catch(error => console.log(error))

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use('/profile', require('./Routes/profile'))
app.use('/journal', require('./Routes/journal'))
app.use('/artifact', require('./Routes/artifact'))

app.get('/', (req, res) => {
  res.send('Welcome to our office!')
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

//============================  Listen
app.listen(process.env.PORT || 5000, () => {
  console.log(`🍔You're listening to the smooth sounds of ${process.env.PORT || 5000}`)
})