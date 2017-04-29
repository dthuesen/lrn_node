var express = require('express');
var request = require('request');

var profileRouter = express.Router();

profileRouter.get('/', function(req, res) {
	var newContact = {
		contactId: null,
		firstName: null,
		lastName: null,
		email: null,
		phone: null,
		imagePath: null
	};

	res.render('pages/profile', {contact: newContact});
});

module.exports = profileRouter;
