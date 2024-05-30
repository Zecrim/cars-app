const mongoose = require('mongoose')
const User = require('./user.js')

const commentSchema = new mongoose.Schema(
    {
      text: {
        type: String,
        required: true
      },
      author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
    },
    { timestamps: true }
  )

const carSchema = new mongoose.Schema(
    {
        make: {
        type: String,
        required: true,
        },
        model: {
        type: String,
        required: true,
        },
        color: {
        type: String,
        },
        year: {
        type: String,
        required: true,
        },
        imgURL: {
        type: String,
        },
        garage: { type: mongoose.Schema.Types.ObjectId, ref: 'Garage' },
        comments: [commentSchema],
    },
)


const garageSchema = new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      },
      owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      cars: [carSchema],
      comments: [commentSchema],
    },
  )

module.exports = mongoose.model('Garage', garageSchema);
