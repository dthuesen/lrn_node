const express = require('express');
const request = require('request');

var profileRouter = express.Router();

profileRouter.get('/', function(req, res) {
  
  let newContact = {
    contactId:  null,
    firstName:  null,
    lastName:   null,
    email:      null,
    phone:      null,
    imagePath:  null
  };
  
	res.render('pages/profile', {contact: newContact});
});

module.exports = profileRouter;
