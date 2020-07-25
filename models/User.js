const mongoose = require('mongoose')
const Schema = mongoose.Schema

const journalSchema = new Schema({
  title: {
    type: String
  },
  content: {
    type: String
  }
}, {
  timestamps: true
})

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
        ref: 'Artifact'
    }],
    journalEntries: [journalSchema]
}, {
    timestamps: true
})

module.exports = mongoose.model('user', UserSchema)