const mongoose = require("mongoose");

// Schema constructor from Mongoose
const Schema = mongoose.Schema;


// use the Schema constructor to create our cat schema
const catSchema = new Schema({
  catName: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    min: 0,
    max: 30,
  },
  color: { type: String },
  vetVisits: [ Date ],
  toys: [ String ],
  // ObjectId doesn't normally exist in JavaScript so we use "Schema.Types"
  owners: [ Schema.Types.ObjectId ],
  countryCode: {
    type: String,
    match: /^[A-Z][A-Z]$/,
  },
  photo: {
    type: String,
    default: "https://example.com/cat-silhouette.jpg"
  },
});

// the variable "Cat" is our Mongoose model object
// the "Cat" model will allow us to work with the "cats" collection
// ("Cat" -> "cat" -> "cats")
const Cat = mongoose.model("Cat", catSchema);


module.exports = Cat;
