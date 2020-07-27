const express = require('express')
const axios = require('axios')

const router = express.Router()

router.get('/:id', (req, res) => {
    axios.get(`https://api.aucklandmuseum.com/id/humanhistory/object/${req.params.id}`)
    .then(response => {
        let resData = response.data
        res.json(resData)
    })
    .catch(err => console.log(`🚦 ${err} 🚦`))
})

module.exports = router