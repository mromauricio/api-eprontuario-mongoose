var async = require('async')
//Set up mongoose connection
var mongoose = require('mongoose');
//var mongoDB = 'mongodb+srv://mromauricioDB:PWDmromauricioDB@cluster0.hufxi.gcp.mongodb.net/local_library?retryWrites=true&w=majority';
var mongoDB = 'mongodb+srv://mromauricioDB:PWDmromauricioDB@cluster0.hufxi.gcp.mongodb.net/eprontuario?retryWrites=true&w=majority';
mongoose.connect(mongoDB, { useNewUrlParser: true , useUnifiedTopology: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var Paciente = require('../models/paciente');

exports.DBinsertPaciente = (data) => {
  let pacienteRecord = new Paciente({nome: data.nome, menor: data.menor, responsavel: data.responsavel, cpfresp: data.cpfresp, cpf: data.cpf,
  cns: data.cns, registro: data.registro, nacionalidade: data.nacionalidade, nascimento: data.nascimento, genero: data.genero, tel: data.tel,
  cel: data.cel, whatsapp: data.whatsapp, email: data.email, endereco: data.endereco, cep: data.cep, bairro: data.bairro, uf: data.uf,
  cidade: data.cidade, historico: data.historico, medicamento: data.medicamento, cirurgia: data.cirurgia, trauma: data.trauma});

 pacienteRecord.save(function (err){
    if (err) console.log(err);
  })
  console.log('Paciente incluído com sucesso no BD!')
  return 0;
}

exports.DBreadPaciente = async (query) => {
  console.log('[QUERY]  CPF: ', query);
  let retorno = await Paciente.find({'cpf':query}, 'nome cpf', function (err, result){
    if (err) return 1;
    if (result) return result; 
  });
 //console.log ('RESULT QUERY DB:', retorno) 
 return retorno;
}


// exports.DBteste = async (data) =>{
// const result = await Paciente.create({nome: data.nome, menor: data.menor, responsavel: data.responsavel, cpfresp: data.cpfresp, cpf: data.cpf,
//   cns: data.cns, registro: data.registro, nacionalidade: data.nacionalidade, nascimento: data.nascimento, genero: data.genero, tel: data.tel,
//   cel: data.cel, whatsapp: data.whatsapp, email: data.email, endereco: data.endereco, cep: data.cep, bairro: data.bairro, uf: data.uf,
//   cidade: data.cidade, historico: data.historico, medicamento: data.medicamento, cirurgia: data.cirurgia, trauma: data.trauma});
// console.log (result instanceof Paciente);
// return 0;
// }