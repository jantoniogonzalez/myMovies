const Movie = require("../models/movie.model");
const List = require("../models/list.model");

module.exports = {
    findAllMovies: (req,res)=>{
        Movie.find({})
            .then((allMovies)=>{
                console.log(allMovies);
                res.json(allMovies);
            })
            .catch((err)=>{
                res.json({message: "something went wrong with findAllMovies"})
            })
    },
    findOneMovie: (req, res)=>{
        Movie.findOne({_id:req.params.id})
            .then((oneMovie)=>{
                console.log(oneMovie);
                res.json(oneMovie);
            })
            .catch((err)=>{
                res.json({message: "something went wrong with findOneMovie"})
            })
    },
    createMovie: (req, res)=>{
        const newMovie = {
            imdbID: req.body.imdbID,
            title: req.body.title
        }

        const newMovieObj = new Movie(newMovie);

        newMovieObj.save()
            .then((newMovie)=>{
                console.log(newMovie);
                res.json(newMovie);
                //When a user "creates a new movie" she/he is simply adding it to a list they have
                //This is why it will save the new movie object and it will also push it to the list
                List.findOneAndUpdate({_id: req.params.id}, {$push: {movies: newMovie}}, {new: false, runValidators:true})
                    .then((addedMovie)=>{
                        console.log("Movie was successfully added!")
                    })
                    .catch((err)=>{
                        console.log(err, "Something went wrong lol")
                    })
            })
            .catch((err)=>{
                res.status(400).json(err);
            })
    },
    watchedMovie: (req, res)=>{

        Movie.findOneAndUpdate(
            {_id: req.params.id}, 
            req.body,
            {new: true})
            .then((updatedMovie)=>{
                console.log(updatedMovie)
                res.json(updatedMovie)
            })
            .catch((err)=>{
                console.log(err)
                res.json({message: "Something went wrong with watchedMovie"})
            })
    },
    deleteMovie: (req, res)=>{
        Movie.findOneAndDelete({_id: req.params.id})
            .then((deletedMovie)=>{
                console.log(deletedMovie);
                res.json(deletedMovie);
            })
            .catch((err)=>{
                console.log(err);
                res.json({message: "Something went wrong with deleteMovie"})
            })
    }
}