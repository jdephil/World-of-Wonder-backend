const express = require('express');
const router = express.Router();

const User = require('../Models/User')

router.get('/', (req, res) => {
    // TODO Change user to current user.
    User.findOne({ email: 'dave@dave.com' })
    .populate('artifacts')
    .exec((err, user) => {
        res.json(user.artifacts)
    })
})

// Export the Routes
module.exports = router