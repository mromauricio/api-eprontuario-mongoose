const express = require('express');
const router = express.Router();
let serviceInfoPaciente = require('../services/servicelInfoPaciente.js');

router.post('/', (req, res) => {
  switch (serviceInfoPaciente.ruleInputPaciente(req.body)) {
    case 0:
        return res.status(201).send();
    case 1:
        return res.status(400).send();
    case 2:
        return res.status(406).send();
  }
});

router.get('/', (req, res, next) => {
  switch (serviceInfoPaciente.ruleReadPaciente(req.query.cpf)) {
    case 0:
        return res.status(200).send();
    case 1:
        return res.status(400).send();
    case 2:
        return res.status(406).send();
  }
});

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