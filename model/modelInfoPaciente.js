let database=[];

exports.insertPaciente = (data) => {
  if (data.cpf!=='') {
  database.push(data);
  console.log(database);
  return 1;
  }
  return 0;
}

exports.readPaciente = (query) => {
  if (database.length>0) {
    for (i=0; i<database.length; i++){
        if (query == database[i].cpf.replace(/[^0-9\'']+/g,'')){
            console.log(`[GET] localizou CPF: ${database[i].cpf}`);
            return 1;
        }
    }
  }
  return 0;
}    

exports.updatePaciente = (idSearch,bodyUpdate) => {
  if (database.length>0) {
    for (i=0; i<database.length; i++){
        if (idSearch == `id${database[i].cpf.replace(/[^0-9\'']+/g,'')}`){
            database[i].cpf = bodyUpdate;
            console.log(`[PUT] localizou CPF ${idSearch.replace('id','')} e modificou para ${database[i].cpf}`);
            return 1;
        }
    }
  } 
  return 0;
}