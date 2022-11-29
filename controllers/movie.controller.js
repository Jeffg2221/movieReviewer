const Movies = require('../models/movie.model');

// const Products = require('../models/pirates.models');
// // ----FULL CRUD ----
module.exports = {
    // // Read All
    findAll: (req, res) => {
        Movies.find().sort({name:"asc"})
            .then(allMovies => {
                res.json(allMovies)
            })

            .catch(err => res.json(err));
    },
    // Read One
    findOne: (req, res) => {
        //http://localhost:8000/api/pirates/3
        Movies.findById(req.params.id)
            .then(oneMovie => res.json(oneMovie))
            .catch(err => res.json(err))
    },

    // Create
    create: (req, res) => {
        console.log(req.body)
        Movies.create(req.body)
            .then(newMovie => {
                console.log("Server Success")
                res.json(newMovie)
            })
            .catch(err => {
                console.log("SERVER ERROR", err)
                res.status(400).json(err)
            })
    },

    // Update
    Update: (req, res) => {
        console.log("UPDATE ID:", req.params.id)
        console.log("req.body:", req.body)
        Movies.findByIdAndUpdate(req.params.id, req.body, {new:true, runValidators:true})
            .then(updatedMovie => res.json(updatedMovie))
                .catch(err => res.json(err))
},

    //  // Delete
    delete : (req, res) => {
        Movies.findByIdAndDelete( req.params.id)
            .then(result => res.json(result))
            .catch(err => res.json({ message: 'Something went wrong', error: err }));
    }





}













