const moviesController = require("../controllers/movies.controller");
const {authenticate} = require("../config/jwt.config");


module.exports = (app) => {

    app.get("/api/movies", moviesController.findAllMovies);
    app.post("/api/movies", authenticate, moviesController.createNewMovie);
    app.get("/api/user/movies/:userId", moviesController.findAllMoviesByUser);
    app.get("/api/movies/:id", moviesController.findOneMovie);
    app.put("/api/movies/:id", moviesController.updateMovie);
    app.delete("/api/movies/:id", moviesController.deleteMovie);

}