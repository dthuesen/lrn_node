var express = require('express');
var app = express();
var url = require('url');

app.get('/', function(req, res) {
	var queryObject = url.parse(req.url, true).query;
	var greeting = queryObject.greeting || 'Default greeting';

	res.send('This is my second node app. ' + greeting);
});

app.listen(8080, function() {
	console.log('Server listening on port 8080');
});
