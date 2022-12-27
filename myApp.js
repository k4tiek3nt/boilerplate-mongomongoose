require('dotenv').config();

// 1) Install & Set up mongoose
const mongoose = require('mongoose');
const mongoUri = process.env.MONGO_URI;

mongoose.connect(mongoUri,{ useNewUrlParser: true, useUnifiedTopology: true });


// 2) Create a 'Person' Model

//Assign Mongoose Schema to a variable
const Schema = mongoose.Schema;

//Create Person Schema
const personSchema = new Schema({
    name: {
      type: String,
      required: true
    },
    age: Number,
    favoriteFoods: [{
      type: String
    }]
  });

//Create Person model from the schema
const Person = mongoose.model('Person', personSchema);

// 3) Create and Save a Person

//Creation of Person
const createAndSavePerson = function(done) {
  const RachelG = new Person({
    name: 'Rachel Greene',
    age: 52,
    favoriteFoods: ['spaghetti', 'english trifle', 'chinese food']
  });
  //Saving Person
  RachelG.save(function(err, data) {
    console.log(data);
    if(err){
      return console.error(err);
    }else{
      done(null,data);
    };
  });
};

// 4) Create Many People with `Model.create()` <- references Person.create()

//First create an array of people (many people in one)
var arrayOfPeople = [
  {name: "Rachel Greene", age: 52, favoriteFoods: ['spaghetti', 'english trifle', 'chinese food']},
  {name: "Ross Geller", age: 55, favoriteFoods: ['chicken nuggets', 'juice box', 'beer']},
  {name: "Monica Geller", age: 52, favoriteFoods: ['wine', 'fine dining', 'turkey', 'see food']},
  {name: "Joey Tribbiani", age: 53, favoriteFoods: ['meat', 'potatoes', 'beer', 'pizza', 'salami', 'spaghetti', 'turkey', 'anything he can see']},
  {name: "Phoebe Buffay", age: 52, favoriteFoods: ['vegetables', 'air', 'wine']},
  {name: "Chandler Bing", age: 54, favoriteFoods: ['pizza', 'beer']}
];

//Take the array of people and put in the database at one time
var createManyPeople = function(arrayOfPeople, done) {
  Person.create(arrayOfPeople, function (err, people) {
    if (err) return console.log(err);
    done(null, people);
  });
};

// 5) Use `Model.find()` <- references Person.find()
const findPeopleByName = function(personName, done) {
  Person.find({ name: personName }, function(err, personFound) {
    console.log(personFound);
    if(err){
      return console.log(err);
    } else{
      done(null, personFound);
    };
  });
};

// 6) Use `Model.findOne()` <- references Person.findOne()
const findOneByFood = function(food, done) {
  Person.findOne({ favoriteFoods: food }, function(err, personFound) {
    console.log(personFound);
    if(err){
      return console.log(err);
    } else{
      done(null, personFound);
    };
  });
};


// 7) Use `Model.findById()` <- references Person.findById()
const findPersonById = function(personId, done) {
  Person.findById(personId, function(err, personFound) {
    console.log(personFound);
    if(err){
      return console.log(err);
    } else{
      done(null, personFound);
    };
  });
};

// Find, Edit, then Save
// Old, long way to update a record
const findEditThenSave = function(personId, done) {
  const foodToAdd = 'hamburger';
  // .findById() method to find a person by id
  Person.findById(personId, function(err, person) {
    console.log(person);
    if(err) return console.log(err);
    // Array.push() method to add "hamburger" to favoriteFoods
    person.favoriteFoods.push(foodToAdd);
    // and inside the find callback - save() the updated Person.
    person.save(function(err, updatedPerson) {
      console.log(updatedPerson);
      if(err) return console.log(err);
      done(null, updatedPerson);
    })
  })
};

//Find and Update at same time
//Newer, shorter way to update a record
const findAndUpdate = function(personName, done) {
  const ageToSet = 20;
  
  Person.findOneAndUpdate(
    {name: personName}, 
    {age: ageToSet}, 
    {new: true}, 
    function(err, updatedPerson) {
      console.log(updatedPerson);
      if(err){
        return console.error(err);
      }else{
        done(null, updatedPerson);
      };    
    }
  );
};

//Delete One Using model.findByIdAndRemove <- references Person.findByIdAndRemove()
const removeById = function(personId, done) {
  Person.findByIdAndRemove(personId,           
   function(err, removedPerson) {
      console.log(removedPerson);
      if(err){
        return console.error(err);
      }else{
        done(null, removedPerson);
      };
    }
  );
};

//Delete Many Using model.remove() <- references Person.remove()
const removeManyPeople = function(done) {
  const nameToRemove = "Mary";

  Person.remove({name: nameToRemove},
    function(err, response) {
    console.log(response);
      if(err){
        return console.error(err);
      }else{
        done(null, response);
      };
    }
  );
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** -------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
