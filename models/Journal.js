const mongoose = require('mongoose')
const Schema = mongoose.Schema

const JournalSchema = new Schema({
    title: {
      type: String
    },
    entry: {
      type: String
    }
}, {
    timestamps: true
})

module.exports = Journal = mongoose.model('journal', JournalSchema)