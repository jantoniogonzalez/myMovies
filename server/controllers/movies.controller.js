const Movies = require("../models/movies.model")
const jwt = require('jsonwebtoken');



module.exports = {

    findAllMovies: (req, res) => {
        Movies.find({})
            .populate("createdBy","username _id")
            .then((allMovies) => {
                console.log(allMovies);
                res.json(allMovies)
            })
            .catch((err) => {
                res.json({ message: "Something went wrong in findAllMovies", error: err });
            })
    },

    findAllMoviesByUser: (req, res) => {
        Movies.find({ createdBy: req.params.userId })
            .then((allUserMovies) => {
                console.log(allUserMovies);
                res.json(allUserMovies);
            })
            .catch((err) => {
                console.log(err);
                res.status(400).json(err)
            })
    },

    findOneMovie: (req, res) => {
        Movies.findOne({ _id: req.params.id })
            .then((oneMovie) => {
                console.log(oneMovie)
                res.json(oneMovie)
            })
            .catch((err) => {
                console.log("findOneMovie failed")
                res.json({ message: "Something went wrong in findOneMovie", error: err });
            })
    },

    createNewMovie: (req, res) => {

        const newMoviesObj = new Movies(req.body);
        const decodedJWT = jwt.decode(req.cookies.usertoken, {
            complete: true
        })
        newMoviesObj.createdBy = decodedJWT.payload.id

        newMoviesObj.save()
            .then((newMovies) => {
                console.log(newMovies);
                res.json(newMovies);
            })
            .catch((err) => {
                console.log("Something went wrong in createNewMovie");
                res.status(400).json(err)
            })
    },

    updateMovie: (req, res) => {
        Movies.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            { new: true, runValidators: true }
        )
            .then((updatedMovie) => {
                console.log(updatedMovie);
                res.json(updatedMovie);
            })
            .catch((err) => {
                res.status(400).json(err);
                res.json({ message: "Something went wrong in updateMovie", error: err });
            })
    },

    deleteMovie: (req, res) => {
        Movies.deleteOne({ _id: req.params.id })
            .then((deletedMovie) => {
                console.log(deletedMovie)
                res.json(deletedMovie)
            })
            .catch((err) => {
                console.log("deleteMovie failed")
                res.json({ message: "Something went wrong with deleteMovie", error: err });
            })
    },
}
