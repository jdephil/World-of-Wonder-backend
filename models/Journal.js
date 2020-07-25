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

module.exports = Journal = mongoose.model('journalEntry', journalSchema)