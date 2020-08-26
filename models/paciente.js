let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let PacienteSchema = new Schema({
  nome         : {type:  String, required: true, maxlength: 100},
  cpf          : {type: String, required: true, maxlength: 100},
});

module.exports = mongoose.model('Paciente',PacienteSchema);