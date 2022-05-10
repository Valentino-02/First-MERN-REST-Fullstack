const asyncHandler = require('express-async-handler')
const swapi = require('swapi-node')
const Film = require('../models/filmModel')

// @desc    Get films by character
// @route   GET api/films/:character
// @access  Private
const getFilms = asyncHandler(async (req, res) => {
    const characterList = await swapi.get('https://swapi.dev/api/people')
    const name = req.params.character
    const films = []
    
    if (name && !characterList.results.find((result) => result.name===name)) {
        res.status(400)
        throw new Error('name not found in database')
    }

    const character = characterList.results.find((result) => result.name===name)
    const filmLinks = character.films

   for (const link of filmLinks) {
       let film = await swapi.get(link)
       films.push(film)
   }

   res.status(200).json(films)
})

module.exports = {
    getFilms,
}