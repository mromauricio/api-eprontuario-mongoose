const express = require('express');
const router = express.Router();

const route_controller = require('../controllers/infopacienteController.js');

router.get('/',route_controller.getCpf);




module.exports = router;