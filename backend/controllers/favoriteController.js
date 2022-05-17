const asyncHandler = require('express-async-handler')
const swapi = require('swapi-node')
const Favorite = require('../models/favoriteModel')

// @desc    Get favorite characters
// @route   GET api/favorite
// @access  Private
const getFavorites = asyncHandler(async (req, res) => {
    const favorites = await Favorite.find({ user: req.user.id })
    
    res.status(200).json(favorites)
})

// @desc    set character as favorite
// @route   POST api/favorite
// @access  Private
const postFavorite = asyncHandler(async (req, res) => {
    if(!req.body.text) {
        res.status(400)
        throw new Error('Please add a character in the text field')
    }

    const favorite = await Favorite.create({
        text: req.body.text,
        user: req.user.id
    })

    res.status(200).json(favorite)
})

// @desc    delete a character from favorites
// @route   DELETE api/favorite/:id
// @access  Private
const deleteFavorite = asyncHandler(async (req, res) => {
    const favorite = await Favorite.findById(req.params.id)
    
    if(!favorite) {
        res.status(400)
        throw new Error('Favorite character not found')
    }

    if(!req.user) {
        res.status(401)
        throw new Error('User not found')
    }

    if(favorite.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorised')         
    }

    await favorite.remove()

    res.status(200).json({ id: req.params.id})
})

module.exports = {
    getFavorites,
    postFavorite,
    deleteFavorite
}