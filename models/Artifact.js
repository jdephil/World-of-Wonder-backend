const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ArtifactSchema = new Schema({
    name: {
      type: String
    },
    description: {
      type: String
    },
    imageurl: {
      type: String
    }
})

module.exports = Artifact = mongoose.model('Artifact', ArtifactSchema)