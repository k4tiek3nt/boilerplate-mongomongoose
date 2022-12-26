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

const createManyPeople = (arrayOfPeople, done) => {
  done(null /*, data*/);
};

const findPeopleByName = (personName, done) => {
  done(null /*, data*/);
};

const findOneByFood = (food, done) => {
  done(null /*, data*/);
};

const findPersonById = (personId, done) => {
  done(null /*, data*/);
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  done(null /*, data*/);
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  done(null /*, data*/);
};

const removeById = (personId, done) => {
  done(null /*, data*/);
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
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
