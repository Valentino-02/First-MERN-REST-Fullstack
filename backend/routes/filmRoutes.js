const express = require('express')
const router = express.Router()
const { 
    getFilms
} = require('../controllers/filmController')
const {protect} = require('../middleware/authMiddleware')

router.get('/:character', protect, getFilms)

module.exports = router