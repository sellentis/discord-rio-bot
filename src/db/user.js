const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  discordId: Number,
  character: String
})

const User = mongoose.model('User', userSchema)

module.exports = {
  userSchema,
  User
}