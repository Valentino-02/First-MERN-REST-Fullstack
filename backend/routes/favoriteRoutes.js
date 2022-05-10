const express = require('express')
const router = express.Router()
const { 
    postFavorite,
    deleteFavorite,
    getFavorites
} = require('../controllers/favoriteController')
const {protect} = require('../middleware/authMiddleware')

router.route('/').post(protect, postFavorite).get(protect, getFavorites)
router.route('/:id').delete(protect, deleteFavorite)

module.exports = router