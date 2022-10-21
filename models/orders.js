const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ordersSchema = new Schema(
  {
    userId: {
      type: String,
      require: true,
    },
    customerName: {
      type: String,
      require: true,
    },
    phone: {
      type: String,
      require: true,
    },
    pitchId: {
      type: String,
      require: true,
    },
    pitchName: {
      type: String,
      require: true,
    },
    pitchSize: {
      type: Number,
      require: true,
    },
    timeOrder: {
      type: String,
      require: true,
    },
    dateOrder: {
      type: String,
      require: true,
    },
    orderStatus: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
)

const Orders = mongoose.model('Orders', ordersSchema)
module.exports = Orders
