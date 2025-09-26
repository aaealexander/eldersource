const express = require('express')
const router = express.Router()
const { list } = require('../controllers/referralController')

router.get('/', list)

module.exports = router
