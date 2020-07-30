require('dotenv').config()
const JwtStrat = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const User = require('../lib/Models/User')

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = process.env.JWT_SECRET

module.exports = passport => {
    passport.use(new JwtStrat(opts, (jwt_payload, done) => {
        User.findById(jwt_payload._doc._id)
        .then(user => {
            if (user) {
                return done(null, user)
            }
            return done(null, false)
        })
        .catch(err => console.log(err))
    }))
}