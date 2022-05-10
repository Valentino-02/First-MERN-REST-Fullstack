const express = require('express')
const router = express.Router()
const { 
    getCharacter
} = require('../controllers/characterController')
const {protect} = require('../middleware/authMiddleware')

router.get('/', protect, getCharacter)

module.exports = router