const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    artifacts: [{
        type: Schema.Types.ObjectId,
        ref: 'artifact'
    }],
    journalEntries: [{
        type: Schema.Types.ObjectId,
        ref: 'Journal'
    }]
}, {
    timestamps: true
})

module.exports = User = mongoose.model('user', UserSchema)