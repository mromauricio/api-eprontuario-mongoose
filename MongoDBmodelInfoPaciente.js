


//Set up mongoose connection
var mongoose = require('mongoose');
var mongoDB = 'mongodb+srv://mromauricioDB:PWDmromauricioDB@cluster0.hufxi.gcp.mongodb.net/local_library?retryWrites=true&w=majority';
mongoose.connect(mongoDB, { useNewUrlParser: true , useUnifiedTopology: true});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var async = require('async')
var Paciente = require('./models/paciente')

nomeaux = 'Miguel';
cpfaux = '171.355.237-09'

let pacientes = [];

function PacienteCreate(nome, cpf, cb) {
  var paciente = new Paciente({ nome: nome, cpf: cpf });
       
  paciente.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New paciente: ' + paciente);
    pacientes.push(paciente)
    cb(null, paciente);
  }   );
}
function createPacientes(cb) {
  async.parallel([
      function(callback) {
        PacienteCreate(nomeaux,cpfaux, callback);
      },
      ],
      // optional callback
      cb);
}
async.series([
  createPacientes,
],
// Optional callback
function(err, results) {
  if (err) {
      console.log('FINAL ERR: '+err);
  }
  else {
      console.log('');
      
  }
  // All done, disconnect from database
  mongoose.connection.close();
});
