const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PitchesSchema = new Schema(
  {
    pitchName: {
      type: String,
      require: true,
    },
    pitchSize: {
      type: Number,
      require: true,
    },
    information: {
      type: String,
      require: true,
    },
    price: {
      type: Number,
      require: true,
    },
  },
  { timestamps: true },
)

const Pitches = mongoose.model('Pitches', PitchesSchema)
module.exports = Pitches
