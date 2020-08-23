let express = require('express');
let router = express.Router();
let database=[];

router.post('/', (req, res) => {
  console.log('req.body: ', req.body);
  database.push(req.body.cpf);
  database.forEach(element => {
      console.log(`[POST] adicionado CPF no database ${database}`);
  });
  res.status(201).send();
});

router.get('/', (req, res, next) => {
  if (database.length>0) {
    for (i=0; i<database.length; i++){
        if (req.query.cpf == database[i].replace(/[^0-9\'']+/g,'')){
            console.log(`[GET] localizado CPF: ${database[i]}`);
            return res.status(200).send();
        }
    }
  }
  res.status(400).send();
});

router.put('/:id', (req, res) => {
  if (database.length>0) {
    for (i=0; i<database.length; i++){
        if (req.params.id == `id${database[i].replace(/[^0-9\'']+/g,'')}`){
            database[i] = req.body.cpf;
            console.log(`[PUT] modificado CPF: ${database}`);
            return res.status(201).send();
        }
    }
  } 
  res.status(400).send();
});

module.exports = router;