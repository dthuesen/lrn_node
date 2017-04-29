var express = require('express');

var profileRouter = express.Router();

profileRouter.get('/', function(req, res) {
	res.render('pages/profile');
});

module.exports = profileRouter;
