var async = require('async')
let DBInfoPaciente = require('../models/DBmodelInfoPaciente.js');

exports.DBruleInputPaciente = (data) => {
    if (data.cpf=='') return 2;                  // Testa se CPF está preenchido
    if (DBInfoPaciente.DBinsertPaciente(data) == 0) return 0;
    return 1;
  }

exports.DBruleReadPaciente = async (query) => {
  if (query=='000') return 2;   // Teste fictício de validação da regra de negócio para provocar return 2 
  let retorno = await DBInfoPaciente.DBreadPaciente(query)
  if (retorno=='') {
   // console.log('RETORNO SERVICE',retorno);
    return 3;
  }
  //console.log('RETORNO SERVICE', retorno)
  return retorno;
} 

let daoInfoPaciente = require('../models/daolInfoPaciente.js');
const { response } = require('express');

exports.ruleInputPaciente = (data) => {
  if (data.cpf=='') return 2;                  // Testa se CPF está preenchido
  if (daoInfoPaciente.insertPaciente(data) == 0) return 0;
  return 1;
}

exports.ruleReadPaciente = (query) => {
  if (query.lenght<11) return 2;   // Testa se CPF tem a qtd mínima de digitos (esta regra estará no Front)
  if (daoInfoPaciente.readPaciente(query) == 0) return 0;
  return 1;
}    

exports.ruleUpdatePaciente = (idSearch,bodyUpdate) => {
  if (idSearch.lenght<11 || bodyUpdate.lenght<11) return 2;   // Testa se CPF tem a qtd mínima de digitos (esta regra estará no Front)
  if (daoInfoPaciente.updatePaciente(idSearch,bodyUpdate) == 0) return 0;
  return 1
}



// exports.DBruleInputPaciente = async (data) => {
//   if (data.cpf=='') return 2;                  // Testa se CPF está preenchido
//   let result = await DBInfoPaciente.DBteste(data) 
//   if (result == 0) return 0;
//   return 1;
// }