let express = require('express');
let app = express();

app.use(express.static(__dirname + '/public'));

app.get('/ajaxcall', (req, res) => {
  let data = {
    contactId: 1,
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@domain.com',
    phone: '0987654321'
  };
  
  res.send(data);
});

app.listen(8000);
