const asyncHandler = require('express-async-handler')
const axios = require('axios')
const Film = require('../models/filmModel')

const swapiURL = 'https://swapi.dev/api/people/'

// @desc    Get films by character
// @route   GET api/films/:character
// @access  Private
const getFilms = asyncHandler(async (req, res) => {
    const name = req.params.character
    const films = []
    
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

    let filmsURL = characters[0].films

    for (const url of filmsURL) {
        let film = await axios.get(url).then((response) => response.data)
        films.push(film)
    }

    res.status(200).json(films)
})

module.exports = {
    getFilms,
}