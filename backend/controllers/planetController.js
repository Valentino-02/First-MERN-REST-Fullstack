const asyncHandler = require('express-async-handler')
const axios = require('axios')
const Planet = require('../models/planetModel')

const swapiURL = 'https://swapi.dev/api/people/'

// @desc    Get planet by character
// @route   GET api/planet/:character
// @access  Private
const getPlanet = asyncHandler(async (req, res) => {
    const name = req.params.character
    
    if (!name) {
        res.status(400)
        throw new Error('please enter a character name as a param')
    }

    let characters = await axios.get(swapiURL + `?search=${name}`).then((response) => response.data.results)

    if (characters.length === 0) {
        res.status(400)
        throw new Error(`no match for the name: ${name}`)
    }
    if (characters.length > 1) {
        res.status(400)
        throw new Error(`more than 1 match for the name: ${name}. Try being more specific`)
    }

    let characterPlanet = await axios.get(characters[0].homeworld).then((result) => result.data)

    res.status(200).json(characterPlanet)
})

module.exports = {
    getPlanet,
}