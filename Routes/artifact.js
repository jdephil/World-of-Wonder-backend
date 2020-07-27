const express = require('express')
const axios = require('axios')

const router = express.Router()

router.get('/', (req, res) => {
    axios.get(`https://api.aucklandmuseum.com/id/humanhistory/object/${req.body.objectId}`)
    .then(response => {
        let resData = response.data
        res.json(resData)
    })
    .catch(err => console.log(`🚦 ${err} 🚦`))
})

module.exports = router