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

exports.DBreadPacienteCpf = async (query) => {
  console.log('[QUERY]  CPF: ', query);
  let retorno = await Paciente.find({'cpf':query}, 'nome cpf menor responsavel cpfresp cns registro nacionalidade nascimento genero tel cel whatsapp email endereco cep bairro uf cidade historico medicamento cirurgia trauma', function (err, result){
    if (err) return 1;
    if (result) return result; 
  });
 if (retorno == 1) return 1;
 return retorno;
}

exports.DBreadPacienteRegistro = async (query) => {
  console.log('[QUERY]  Registro: ', query);
  let retorno = await Paciente.find({'registro':query}, 'nome cpf', function (err, result){
    if (err) return 1;
    if (result) return result; 
  });
 if (retorno == 1) return 1;
 return retorno;
}

exports.DBreadPacienteNome = async (query) => {
  console.log('[QUERY]  NOME: ', query);
  let retorno = await Paciente.find({'nome':query}, 'nome cpf menor responsavel cpfresp cns registro nacionalidade nascimento genero tel cel whatsapp email endereco cep bairro uf cidade historico medicamento cirurgia trauma', function (err, result){
    if (err) return 1;
    if (result) return result; 
  });
 //console.log ('RESULT QUERY DB:', retorno) 
 if (retorno == 1) return 1;
 return retorno;
}

exports.DBupdatePaciente = async (idSearch,bodyUpdate) => {
  console.log('[ID search]->',idSearch);
  let retornoFind = await Paciente.findOne({'_id':idSearch});
  if (retornoFind._id != idSearch) return 1;
  
  retornoFind.nome = bodyUpdate.nome;
  retornoFind.menor = bodyUpdate.menor;
  retornoFind.responsavel = bodyUpdate.responsavel;
  retornoFind.cpfresp = bodyUpdate.cpfresp;
  retornoFind.cpf = bodyUpdate.cpf;
  retornoFind.cns = bodyUpdate.cns;
  retornoFind.registro = bodyUpdate.registro;
  retornoFind.nacionalidade = bodyUpdate.nacionalidade;
  retornoFind.nascimento = bodyUpdate.nascimento;
  retornoFind.genero = bodyUpdate.genero;
  retornoFind.tel = bodyUpdate.tel;
  retornoFind.cel = bodyUpdate.cel;
  retornoFind.whatsapp = bodyUpdate.whatsapp;
  retornoFind.email = bodyUpdate.email;
  retornoFind.endereco = bodyUpdate.endereco;
  retornoFind.cep = bodyUpdate.cep;
  retornoFind.bairro = bodyUpdate.bairro;
  retornoFind.uf = bodyUpdate.uf;
  retornoFind.cidade = bodyUpdate.cidade;
  retornoFind.historico = bodyUpdate.historico;
  retornoFind.medicamento = bodyUpdate.medicamento;
  retornoFind.cirurgia = bodyUpdate.cirurgia;
  retornoFind.trauma = bodyUpdate.trauma;

  let retorno = await retornoFind.save();
  console.log('Updated _id-> ',retorno._id);
  return 0;
}


//// TEMP ///

exports.DBupdateCpfPaciente = async (idSearch,bodyUpdate) => {
  console.log('[CPF search]->',idSearch);
  console.log('[CPF update]->',bodyUpdate);
  let retornoFind = await Paciente.findOne({'cpf':idSearch});
  if (retornoFind.cpf != idSearch) return 1;
  retornoFind.cpf = bodyUpdate;
  let retorno = await retornoFind.save();
  if (retorno.cpf != bodyUpdate) return 1;
  console.log('CPF alterado para: ',retorno.cpf);
  return 0;
}

// exports.DBupdatePaciente = (idSearch,bodyUpdate) => {
//   console.log('[CPF search]->',idSearch, '  [CPF update]->',bodyUpdate);
//   Paciente.findOne({'cpf':idSearch})
//   .then(retorno => Paciente.updateOne({'_id':retorno._id},{'cpf':bodyUpdate}))
//   .then(retorno => console.log('DB APÓS ALTERAÇÃO: ',retorno));
//   return 0;
// }


// let doc = await Character.findOneAndUpdate(filter, update, {
//   new: true
// });
// doc.name; // 'Jean-Luc Picard'
// doc.age; // 59