const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());      

var infopacienteRouter = require('./routes/infopaciente.js');
app.use('/infopaciente', infopacienteRouter);

const port = 3000;
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
});

