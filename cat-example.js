const mongoose = require("mongoose");

const Cat = require("./cat-model.js");

// connect to the database described by this CONNECTION STRING
// (domain, credentials, database name and all the info about the database)
mongoose.connect("mongodb://localhost/catflix");



// Creating new cats (insert a new document in the database)
// -----------------------------------------------------------------------------
Cat.create({ catName: "Tipi", age: 11, color: "red", toys: [ "mice" ] })
  .then(catDoc => {
    console.log("Tipi create SUCCESS!!", catDoc);
  })
  .catch(err => {
    console.log("Tipi create FAILURE!! 💩", err);
  });

const lucaCat = new Cat({ catName: "Microbe", age: 4, color: "white" });
lucaCat.save()
  .then(catDoc => console.log("Microbe save SUCCESS!!", catDoc))
  .catch(err => console.log("Microbe save FAILURE!! 💩", err));


// Reading cats from the database (use filter objects)
// -----------------------------------------------------------------------------

// ".find()" will always give back an ARRAY of results
Cat.find({ age: { $gt: 5 } })
  .then(catResults => {
    // results of the database query are always parameters of ".then()"
    catResults.forEach(oneCat => {
      console.log(`meow ${oneCat.catName} (id: ${oneCat._id})`);
    });
  })
  .catch(err => {
    console.log("Cat.find() FAILURE!! 💩", err);
  });

// ".findOne()" will always give back a SINGLE result
Cat.findOne({ catName: { $eq: "Microbe" } })
  .then(catDoc => {
    console.log(`ONE CAT -> ${catDoc.catName} (id: ${catDoc._id})`);
  })
  .catch(err => {
    console.log("Cat.findOne() FAILURE!! 💩", err);
  });

// ".findById()" will always give back a SINGLE result
Cat.findById("5b8810e1409d3b48a769d512")
  .then(catDoc => {
    console.log(`FIND BY ID -> ${catDoc.catName} (id: ${catDoc._id})`);
  })
  .catch(err => {
    console.log("Cat.findById() FAILURE!! 💩", err);
  });



// Updating existing cats in the database
// -----------------------------------------------------------------------------
Cat.findByIdAndUpdate(
  "5b88115b51745448dcd868aa",    // 1st argument -> WHICH DOCUMENT(S)?
  { $set: { catName: "Mucha" } } // 2nd argument -> HOW WILL THEY CHANGE?
)                                // (update operators: $set, $push, $inc)
.then(catDoc => {
  console.log(`Cat UPDATED ${catDoc._id}`);
})
.catch(err => {
  console.log("Cat.findByIdAndUpdate() FAILURE!! 💩", err);
});

Cat.updateMany(
  { catName: { $eq: "Microbe" } }, // 1st argument -> WHICH DOCUMENT(S)?
  { $inc: { age: 1 } }             // 2nd argument -> HOW WILL THEY CHANGE?
)                                  // (update operators: $set, $push, $inc)
.then(result => {
  console.log("Microbes are ONE YEAR older", result);
})
.catch(err => {
  console.log("Cat.updateMany() FAILURE!! 💩", err);
});

Cat.findByIdAndUpdate(
  "5b88115b51745448dcd868aa",    // 1st argument -> WHICH DOCUMENT(S)?
  { $push: { toys: "plants" } }, // 2nd argument -> HOW WILL THEY CHANGE?
)                                // (update operators: $set, $push, $inc)
.then(catDoc => {
  console.log(`Cat $push WORKED ${catDoc._id}`);
})
.catch(err => {
  console.log("Cat $push FAILURE!! 💩", err);
});



// Deleting cats from the database
// -----------------------------------------------------------------------------
Cat.findByIdAndRemove("5b880a53d5b1fa4764b9e4b3")
  .then(catDoc => {
    console.log(`DELETED ${catDoc.catName} (id: ${catDoc._id})`);
  })
  .catch(err => {
    console.log("Cat.findByIdAndRemove() FAILURE!! 💩", err);
  });

Cat.deleteMany({ catName: { $eq: "Blah" } })
  .then(result => {
    console.log("deleteMany WORKED", result);
  })
  .catch(err => {
    console.log("Cat.deleteMany() FAILURE!! 💩", err);
  });
