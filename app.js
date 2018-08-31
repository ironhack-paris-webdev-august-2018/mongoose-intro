// Setup
// -----------------------------------------------------------------------------
const express = require("express");
const mongoose = require("mongoose");

const Cat = require("./cat-model.js");

// connect to the database described by this CONNECTION STRING
// (domain, credentials, database name and all the info about the database)
mongoose.connect("mongodb://localhost/catflix");

const app = express();

app.use(express.static(__dirname + "/public"));

app.set("view engine", "hbs");



// Routes
// -----------------------------------------------------------------------------
app.get("/", (request, response, next) => {
  Cat.find({ age: { $ne: null } })
    .then(catResults => {
      response.locals.catArray = catResults;
      response.render("cat-list.hbs");
    })
    .catch(err => {
      console.log("HOME PAGE Cat.find() FAILURE!! 💩", err);
      response.render("error-page.hbs");
    });
});


app.listen(3000, () => {
  console.log("meow 😼");
});
