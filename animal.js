let mongoose = require('mongoose');

let Schema = mongoose.Schema;

var animalSchema = new Schema({ name: String, type: String });

animalSchema.statics.findByName = function(name) {
  return this.find({ name: new RegExp(name, 'I') });
};

const Animal = mongoose.model('Animal', animalSchema);

async function Executa() {
let animals = await Animal.findByName('fido');
console.log(animals);
}


// animalSchema.query.byName = function(name) {
//   return this.where({ name: new RegExp(name, 'i') });
// };

// var Animal = mongoose.model('Animal', animalSchema);

// Animal.find().byName('fido').exec(function(err, animals) {
//   console.log(animals);
// });

// Animal.findOne().byName('fido').exec(function(err, animal) {
//   console.log(animal);
// });

// async function Executa() {
//   let retorno = await Animal.find().byName('fido').exec(function(err, animals) {
//     return animals;
//   });
//   console.log(retorno);
// }

Executa();