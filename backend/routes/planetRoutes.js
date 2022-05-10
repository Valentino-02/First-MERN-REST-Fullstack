const express = require('express')
const router = express.Router()
const { 
    getPlanet
} = require('../controllers/planetController')
const {protect} = require('../middleware/authMiddleware')

router.get('/:character', protect, getPlanet)

module.exports = router