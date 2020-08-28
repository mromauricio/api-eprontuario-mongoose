var async = require('async');
const express = require('express');
const router = express.Router();
let serviceInfoPaciente = require('../services/servicelInfoPaciente.js');

router.post('/', (req, res) => {
  switch (serviceInfoPaciente.DBruleInputPaciente(req.body)) {
    case 0:
        return res.status(201).send();
    case 1:
        return res.status(500).send();
    case 2:
        return res.status(406).send();
  }
});

router.get('/consulta_temp', async (req, res, next) => {
  let retorno = await serviceInfoPaciente.DBruleReadPaciente(req.query.cpf)
  //console.log('RETORNO CONTROLLER ', retorno )
  switch (retorno) {  
    case 1:
        return res.status(500).send({'':''});
    case 2:
        return res.status(406).send({'':''});
    case 3:
        return res.status(404).send({"CPF buscado não existe no Banco de Dados.":""});    
    default:
        return res.status(200).send(retorno);    
  }
});

// router.post('/', (req, res) => {
//   switch (serviceInfoPaciente.ruleInputPaciente(req.body)) {
//     case 0:
//         return res.status(201).send();
//     case 1:
//         return res.status(400).send();
//     case 2:
//         return res.status(406).send();
//   }
// });

// router.get('/', (req, res, next) => {
//   switch (serviceInfoPaciente.ruleReadPaciente(req.query.cpf)) {
//     case 0:
//         return res.status(200).send();
//     case 1:
//         return res.status(400).send();
//     case 2:
//         return res.status(406).send();
//   }
// });

router.put('/:id', (req, res) => {
  switch (serviceInfoPaciente.ruleUpdatePaciente(req.params.id,req.body.cpf)) {
    case 0:
        return res.status(200).send();
    case 1:
        return res.status(400).send();
    case 2:
        return res.status(406).send();
  }
});

module.exports = router;