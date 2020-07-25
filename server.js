const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const db = 'mongodb://localhost:27017/worldofwonder'
mongoose.connect(db).then((() => console.log('MONGOOSE CONNECTED'))).catch(error => console.log(error))



app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use('/profile', require('./Routes/profile'))
app.use('/journal', require('./Routes/journal'))


app.get('/', (req, res) => {
  res.send('Welcome to our office!')
})

//============================  Listen
app.listen(process.env.PORT || 5000, () => {
  console.log(`🍔You're listening to the smooth sounds of ${process.env.PORT || 5000}`)
})

module.exports = app;