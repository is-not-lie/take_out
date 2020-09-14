const express = require('express')
const router = express.Router()

require('./user')(router)
require('./category')(router)
require('./shops')(router)

module.exports = router
