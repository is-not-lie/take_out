const mongoose = require('mongoose')

const shopsSchema = new mongoose.Schema({})

module.exports = mongoose.model('shops', shopsSchema)
