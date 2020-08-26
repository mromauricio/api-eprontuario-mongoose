


//Set up mongoose connection
var mongoose = require('mongoose');
var mongoDB = 'mongodb+srv://mromauricioDB:PWDmromauricioDB@cluster0.hufxi.gcp.mongodb.net/local_library?retryWrites=true&w=majority';
mongoose.connect(mongoDB, { useNewUrlParser: true , useUnifiedTopology: true});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var async = require('async')
var Paciente = require('./model/paciente')


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
        PacienteCreate("Mauricio","045.319.137.10", callback);
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
