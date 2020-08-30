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