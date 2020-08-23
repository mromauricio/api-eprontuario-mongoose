const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());      

var infopaciente = require('./controllers/infopacienteController.js');
app.use('/infopaciente', infopaciente);

const port = 3000;
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
});

