var async = require('async')

var mongoose = require('mongoose');
var mongoDB = 'mongodb+srv://mromauricioDB:PWDmromauricioDB@cluster0.hufxi.gcp.mongodb.net/eprontuario?retryWrites=true&w=majority';
mongoose.connect(mongoDB, { useNewUrlParser: true , useUnifiedTopology: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function() {console.log("Successful connection on MongoDB eProntuario!");});

var Paciente = require('../models/paciente');

exports.DBinsertPaciente = async (data) => {
  let pacienteRecord = new Paciente({nome: data.nome, menor: data.menor, responsavel: data.responsavel, cpfresp: data.cpfresp, cpf: data.cpf,
  cns: data.cns, registro: data.registro, nacionalidade: data.nacionalidade, nascimento: data.nascimento, genero: data.genero, tel: data.tel,
  cel: data.cel, whatsapp: data.whatsapp, email: data.email, endereco: data.endereco, cep: data.cep, bairro: data.bairro, uf: data.uf,
  cidade: data.cidade, historico: data.historico, medicamento: data.medicamento, cirurgia: data.cirurgia, trauma: data.trauma});
  
  let retorno = await pacienteRecord.save(function (err, result){
    if (err) {console.log(err); return 1;}
    if (result) {console.log('[REGISTRO INSERIDO] ',result); return result;}
  });
  if (retorno == 1) return 1;
  return 0;
}

exports.DBreadPacienteNome = async (query) => {
  console.log('[CONSULTA COMEÇA COM]  NOME: ', query);
  //query = '^'+query;  // regex ˆ significa - começa com
  let retorno = await Paciente.find({ $or:[
      { 'nome': query },
      { 'nome': query.normalize('NFD').replace(/[\u0300-\u036f]/g, "") }
      // { 'nome': { $regex: query, $options: 'i' }},
      // { 'nome': { $regex: query.normalize('NFD').replace(/[\u0300-\u036f]/g, ""), $options: 'i' }}
      ]},  function (err, result){
        if (err) return 1;
        if (result) return result; 
      });
 console.log ('[RETORNO CONSULTA] ', retorno) 
 if (retorno == 1) return 1;
 return retorno;
}

exports.DBupdatePaciente = async (idSearch,bodyUpdate) => {
  console.log('[ID CONSULTA]->',idSearch);
  let retornoFind = await Paciente.findOne({'_id':idSearch}, function (err, result){
    if (err) return 1;
    if (result) return result; 
  });
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

  let retorno = await retornoFind.save(function (err, result){
    if (err) {console.log(err); return 1;}
    if (result) {console.log('[REGISTRO ATUALIZADO] ',result); return result;}
  });
  return 0;
}

exports.DBreadPacienteCpf = async (query) => {
  console.log('[CONSULTA]  CPF: ', query);
  let retorno = await Paciente.find({'cpf':query}, function (err, result){
    if (err) return 1;
    if (result) return result; 
  });
 if (retorno == 1) return 1;
 console.log('[RETORNO CONSULTA] ',retorno);
 return retorno;
}

exports.DBreadPacienteCns = async (query) => {
  console.log('[CONSULTA]  CNS: ', query);
  let retorno = await Paciente.find({'cns':query}, function (err, result){
    if (err) return 1;
    if (result) return result; 
  });
 if (retorno == 1) return 1;
 console.log('[RETORNO CONSULTA] ',retorno);
 return retorno;
}


exports.DBreadPacienteRegistro = async (query) => {
  console.log('[CONSULTA]  REGISTRO: ', query);
  let retorno = await Paciente.find({'registro':query}, function (err, result){
    if (err) return 1;
    if (result) return result; 
  });
 if (retorno == 1) return 1;
 console.log('[RETORNO CONSULTA] ',retorno);
 return retorno;
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
