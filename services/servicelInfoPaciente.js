var async = require('async')
let DBInfoPaciente = require('../models/DBmodelInfoPaciente.js');

exports.DBruleInputPaciente = async (data) => {
  data.nome = data.nome.toUpperCase();
  //if (data.cpf=='') return 2;                  // Regra que obriga o CPF ser preenchido
  if (await DBInfoPaciente.DBinsertPaciente(data) == 0) return 0;
  return 1;
  }


exports.DBruleReadPacienteNome = async (query) => {
  if (query=='') return 2;   // Teste fictício de validação da regra de negócio para provocar return 2 
  let retorno = await DBInfoPaciente.DBreadPacienteNome(query)
  if (retorno=='') {
    return 3;
  }
  return retorno;
} 

exports.DBruleReadPacienteCpf = async (query) => {
  if (query=='000') return 2;   // Teste fictício de validação da regra de negócio para provocar return 2 
  let retorno = await DBInfoPaciente.DBreadPacienteCpf(query)
  if (retorno=='') return 3;
  if (retorno==1) return 1;
  return retorno;
} 

exports.DBruleReadPacienteCns = async (query) => {
  if (query=='000.0000.0000.0000') return 2;   // Teste fictício de validação da regra de negócio para provocar return 2 
  let retorno = await DBInfoPaciente.DBreadPacienteCns(query)
  if (retorno=='') return 3;
  if (retorno==1) return 1;
  return retorno;
} 


exports.DBruleReadPacienteRegistro = async (query) => {
  if (query=='0.000.000') return 2;   // Teste fictício de validação da regra de negócio para provocar return 2 
  let retorno = await DBInfoPaciente.DBreadPacienteRegistro(query)
  if (retorno=='') return 3;
  if (retorno==1) return 1;
  return retorno;
} 

exports.DBruleUpdatePaciente = async (idSearch,bodyUpdate) => {
  idSearch = idSearch.replace('id','');
  bodyUpdate.nome = bodyUpdate.nome.toUpperCase();
  // Não há regra de negócio neste caso
  let retorno = await DBInfoPaciente.DBupdatePaciente(idSearch,bodyUpdate);
  if (retorno == 0) return 0;
  return 1
}



exports.DBruleUpdateCpfPaciente = async (idSearch,bodyUpdate) => {
  idSearch = idSearch.replace('idtemp','');
  if (idSearch.lenght<11 || bodyUpdate.lenght<11) return 2;   // Testa se CPF tem a qtd mínima de digitos (esta regra estará no Front)
  let retorno = await DBInfoPaciente.DBupdateCpfPaciente(idSearch,bodyUpdate);
  if (retorno == 0) return 0;
  return 1
}
