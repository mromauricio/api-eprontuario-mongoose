let express = require('express');
let router = express.Router();
let modelInfoPaciente = require('../model/modelInfoPaciente.js');

router.post('/', (req, res) => {
  if (modelInfoPaciente.insertPaciente(req.body)==0) return res.status(400).send();
  res.status(201).send();
});

router.get('/', (req, res, next) => {
  if (modelInfoPaciente.readPaciente(req.query.cpf)==0) return res.status(400).send();
  return res.status(200).send();
});

router.put('/:id', (req, res) => {
  if (modelInfoPaciente.updatePaciente(req.params.id,req.body.cpf)==0) return res.status(400).send();
  return res.status(201).send();
});


module.exports = router;