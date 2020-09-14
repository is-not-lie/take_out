const mongoose = require('mongoose')

const defaultAvatarUrl = 'default.png'
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  avatar_url: { type: String, default: defaultAvatarUrl },
  create_time: { type: Number, default: Date.now() }
})

module.exports = mongoose.model('user', userSchema)
