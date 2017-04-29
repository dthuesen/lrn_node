var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));

app.get('/v1/contact', function(req, res) {
	var data = {
		contactId: 1,
		firstName: 'John',
		lastName: 'Doe',
		email: 'john.doe@domain.com',
		phone: '987654'
	};

	res.send(data);
});

app.post('/v1/contact', function(req, res) {
	var store = '';

	req.on('data', function(data) {
		store += data;
	});

	req.on('end', function() {
		res.setHeader('Content-Type', 'application/json');
		res.end(store);
	});
});

app.put('/v1/contact/:contactId', function(req, res) {
	var store = '';

	req.on('data', function(data) {
		store += data;
	});

	req.on('end', function() {
		res.setHeader('Content-Type', 'application/json');
		res.end(store);
	});
});

app.delete('/v1/contact/:contactId', function(req, res) {
	res.send({message: 'Record deleted.'});
});

app.listen(8000);