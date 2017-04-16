var express = require('express');

var contactsRouter = express.Router();

contactsRouter.get('/', function(req, res) {
	res.render('pages/contacts');
});

module.exports = contactsRouter;
