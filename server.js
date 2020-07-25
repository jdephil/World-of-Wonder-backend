const express = require('express')
const app = express()
// const db = require('./Models')

// let mongoose = require('mongoose')
// mongoose.connect('mongodb://localhost/introgoose')
// let db = mongoose.connection


// === Another option for connecting routers //
  // var profileRouter = require('./Routes/profile');
  // app.use('/profile', profileRouter);


//========================Middleware
// app.use(express.urlencoded({ encoded: false }))
// app.use(express.json())

//===========================Routes
app.use('/profile', require('./Routes/profile'))

app.get('/', (req, res) => {
  res.send('Welcome to our office!')
})

//============================  Listen
app.listen(process.env.PORT || 5000, () => {
  console.log(`🍔You're listening to the smooth sounds of ${process.env.PORT || 5000}`)
})

module.exports = app;