var express = require('express');
var app = express();

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.set('views', './views');
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
	res.render('pages/four');
});

app.get('/basicform', function(req, res) {
	res.render('pages/five');
});

app.post('/basicform', function(req, res) {
	console.log(req.body.inputEmail3 + ", " + req.body.inputPassword3);
	res.send('Login successful');
});

var memberAPI = express.Router();

memberAPI.get('/', function(req, res) {
	res.send('Member page!');
});

memberAPI.get('/profile', function(req, res) {
	res.send('Member profile page!');
});

memberAPI.get('/changepassword', function(req, res) {
	res.send('Member change password page!');
});

var adminAPI = express.Router();

adminAPI.get('/', function(req, res) {
	res.send('Admin page!');
});

app.use('/api/member', memberAPI);

app.use('/api/admin', adminAPI);

app.use(express.static(__dirname + '/public'));

app.listen(8080);