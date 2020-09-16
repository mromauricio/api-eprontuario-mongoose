const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());      

let infopaciente = require('./controllers/controllerInfoPaciente.js');
app.use('/infopaciente', infopaciente);

const port = 3000;
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
});

