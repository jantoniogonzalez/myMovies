const mongoose = require("mongoose");

const MoviesSchema = new mongoose.Schema({

    title: {
        type: String, 
        required: [true, "Please add a title to this setup"],
        minLength: [3, "Title must be at least 3 characters long!"]    
    },
    
    

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
    },

}, {timestamps: true});

const Movies = mongoose.model("Movies", MoviesSchema);

module.exports = Movies;