let express = require('express');
let app = express();

let bodyParser = require('body-parser');

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/v1/contact', (req, res) => {
  let data = {
    contactId: 1,
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@domain.com',
    phone: '0987654321'
  };
  
  res.send(data);
});

app.get('/v1/contact/:contactId', (req, res) => {
  let data = {
    contactId: 2,
    firstName: 'Taylor',
    lastName: 'swift',
    email: 'taylor.swift@domain.com',
    phone: '123456'
  };
  
  res.send(data);
});

app.post('/v1/contact', (req, res) => {
  res.send(req.body);
});

app.put('/v1/contact/:contactId', (req, res) => {
  res.send(req.body);
});

app.delete('/v1/contact/:contactId', (req, res) => {
  res.send({message: 'Record deleted.'});
});

app.listen(8000);
