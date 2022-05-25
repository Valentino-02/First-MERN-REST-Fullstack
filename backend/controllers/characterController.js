const asyncHandler = require('express-async-handler')
const axios = require('axios')
const Character = require('../models/characterModel')

const swapiURL = 'https://swapi.dev/api/people/'

// @desc    Get character info. If no id or name, gets a list of all the characters
// @route   GET api/character/?id?name
// @access  Private
const getCharacter = asyncHandler(async (req, res) => {
    const id = req.query.id
    const name = req.query.name

    // Check for valid id and get character by id. Also checks if name is also passed
    if (id) {
        let max_id = await axios.get(swapiURL).then((response) => response.data.count)

        if (isNaN(id)) {
            res.status(400)
            throw new Error('id should be a number, and greater than zero')
        }
        if (id > max_id) {
            res.status(400)
            throw new Error(`id should be less than ${max_id}`)
        }

        let character = await axios.get(swapiURL + `${id}`).then((response) => response.data)

        if (name && name !== character.name) {
            res.status(400)
            throw new Error('name and id do not match')
        }

        res.status(200).json(character)
    }

    // get character by name or part of the name. Gives error if more than 1 possible result
    if (name) {
        let characters = await axios.get(swapiURL + `?search=${name}`).then((response) => response.data.results)

        if (characters.length === 0) {
            res.status(400)
            throw new Error(`no match for the name: ${name}`)
        }
        if (characters.length > 1) {
            res.status(400)
            throw new Error(`more than 1 match for the name: ${name}. Try being more specific`)
        }
    
        let character = characters[0]
        res.status(200).json(character)
    }

    // gets list of all characters names if no id or name is passed
    // if (!id && !name) {
    //     let characters = []
    //     let page = await axios.get(swapiURL).then((response) => response.data)

    //     while (page.next !== null) {
    //         for (const result of page.results) {
    //             characters.push(result.name)
    //         }
    //         page = await axios.get(page.next).then((response) => response.data)
    //     }

    //     res.status(200).json(characters)
    // }

     // gets list of all characters if no id or name is passed
     if (!id && !name) {
        let characters = []
        let page = await axios.get(swapiURL).then((response) => response.data)

        while (page.next !== null) {
            characters = characters.concat(page.results)
            page = await axios.get(page.next).then((response) => response.data)
        }

        res.status(200).json(characters)
    }
})

module.exports = {
    getCharacter,
}