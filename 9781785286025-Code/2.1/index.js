var http = require('http');
var url = require('url');

var httpServer = http.createServer(function(req, res) {
	var queryObject = url.parse(req.url, true).query;
	var greeting = queryObject.greeting || 'Default greeting';

	res.end('This is my first node app. ' + greeting);
});

httpServer.listen(8080, function() {
	console.log('Server listening on port 8080');
});