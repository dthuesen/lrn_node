let express = require('express');
let app = express();

app.use(express.static(__dirname + '/public'));

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

app.post('/v1/contact', (req, res) => {
  let store = '';
  req.on('data', (data) => {
    store += data;
  })
  
  req.on('end', () => {
    res.setHeader('Content-Type', 'application/json');
    res.end(store);
  })
});

app.put('/v1/contact/:contactId', (req, res) => {
  let store = '';
  req.on('data', (data) => {
    store += data;
  })
  
  req.on('end', () => {
    res.setHeader('Content-Type', 'application/json');
    res.end(store);
  })
});

app.delete('/v1/contact/:contactId', (req, res) => {
  res.send({message: 'Record deleted.'});
});

app.listen(8000);
