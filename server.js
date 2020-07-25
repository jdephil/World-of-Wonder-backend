const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const app = express()

const db = 'mongodb://localhost:27017/worldofwonder'
mongoose.connect(db).then((() => console.log('MONGOOSE CONNECTED'))).catch(err => console.log(err))

const artifact = require('./Routes/artifact')

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send('Hello, world!')
})

app.use('/artifact', artifact)

app.listen(5000, () => console.log('LISTENING'))