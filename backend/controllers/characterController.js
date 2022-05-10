const asyncHandler = require('express-async-handler')
const swapi = require('swapi-node')
const Character = require('../models/characterModel')

// @desc    Get character info
// @route   GET api/character/?id?name
// @access  Private
const getCharacter = asyncHandler(async (req, res) => {
    const characterList = await swapi.get('https://swapi.dev/api/people')
    const id = req.query.id
    const name = req.query.name
    
    // Check for valid id and name
    if (id && isNaN(id)) {
        res.status(400)
        throw new Error('id should be a number')
    }
    if (id > characterList.count) {
        res.status(400)
        throw new Error(`id should be less than ${characterList.count}`)
    }
    if (name && !characterList.results.find((result) => result.name===name)) {
        res.status(400)
        throw new Error('name not found in database')
    }

    // Check for id and or name and return adecuate response
    if (id && !name) {
        let character = await swapi.people({id:id})
        res.status(200).json(character)
    } 
    if ( !id && name) {
        let character = characterList.results.find((result) => result.name===name)
        res.status(200).json(character)
    }
    if (id && name) {
        let character = await swapi.people({id:id})
        if (name !== character.name) {
            res.status(400)
            throw new Error('name and id do not match')
        } else {
            res.status(200).json(character)
        }
    }
    if (!id && !name) {
        res.status(200).json(characterList.results)
    }
})

module.exports = {
    getCharacter,
}