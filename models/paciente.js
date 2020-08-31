let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let PacienteSchema = new Schema({
  nome         : {type:  String, required: true, maxlength: 200},
  menor        : {type: Boolean},
  responsavel  : {type:  String, maxlength: 200},
  cpfresp      : {type: String, maxlength: 14},
  cpf          : {type: String, maxlength: 14},
  cns          : {type: String, maxlength: 18},
  registro     : {type: String, maxlength: 9},
  nacionalidade: {type: String},
  nascimento   : {type: Date},
  genero       : {type: String},
  tel          : {type: String, maxlength: 14},  
  cel          : {type: String, maxlength: 15},  
  whatsapp     : {type: Boolean},
  email        : {type: String},
  endereco     : {type: String},
  cep          : {type: String, maxlength: 9},
  bairro       : {type: String},
  uf           : {type: String},
  cidade       : {type: String},
  historico    : {type: String},
  medicamento  : {type: String},
  cirurgia     : {type: String},
  trauma       : {type: String}
});


module.exports = mongoose.model('Paciente',PacienteSchema);
