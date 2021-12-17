const mongoose = require("mongoose");
const dbName = "movies";

mongoose.connect("mongodb://localhost/" + dbName,{
    useNewUrlParser: true,
    useunifiedTopology: true
})
    .then(()=>{
        console.log("Connected to database called " + dbName);
    })
    .catch((err)=>{
        console.log("There was an error connecting to the database " + dbName);
        console.log(err);
    })
