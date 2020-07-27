const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
require('dotenv').config()
const cors = require('cors')
const passport = require('passport')

const app = express()
const User = require("./Models/User")

const db = 'mongodb://localhost:27017/worldofwonder'
mongoose.connect(db).then((() => console.log('MONGOOSE CONNECTED'))).catch(error => console.log(error))

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use(cors({
  origin: process.env.CLIENT_URL,
  optionsSuccessStatus: 200
}))

app.get('/', (req, res) => {
  res.send('Welcome to our office!')
})

app.use(passport.initialize())
require('./config/passport')(passport)

app.use('/artifact', require('./Routes/artifact'))
app.use('/journal', passport.authenticate('jwt', { session: false }), require('./Routes/journal'))
app.use('/profile', passport.authenticate('jwt', { session: false }), require('./Routes/profile'))
app.use('/', require('./Routes/auth'))

//============================  Listen
app.listen(process.env.PORT || 5000, () => {
  console.log(`🍔You're listening to the smooth sounds of ${process.env.PORT || 5000}`)
})