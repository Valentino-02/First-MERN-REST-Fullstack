const asyncHandler = require('express-async-handler')
const swapi = require('swapi-node')
const Planet = require('../models/planetModel')

// @desc    Get planet by character
// @route   GET api/planet/:character
// @access  Private
const getPlanet = asyncHandler(async (req, res) => {
    const characterList = await swapi.get('https://swapi.dev/api/people')
    const name = req.params.character
    
    if (name && !characterList.results.find((result) => result.name===name)) {
        res.status(400)
        throw new Error('name not found in database')
    }

    const character = characterList.results.find((result) => result.name===name)
    const characterPlanet = await swapi.get(character.homeworld)
    res.status(200).json(characterPlanet)
})

module.exports = {
    getPlanet,
}