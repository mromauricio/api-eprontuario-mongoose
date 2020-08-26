let daoInfoPaciente = require('../models/daolInfoPaciente.js');

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