var express = require('express');
var app = express();

var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

var contactRouter = require('./contact-router');

app.use('/v1/contact', contactRouter);

app.listen(8000);