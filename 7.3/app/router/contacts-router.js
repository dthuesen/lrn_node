const express = require('express');
const request = require('request');

const contactsRouter = express.Router();

contactsRouter.get('/', function(req, res) {
  
  request.get({
    url: 'http://localhost:3000/v1/contact'
  }, (err, response, body) => {
    if (!err && response.statusCode === 200) {
      let rows = JSON.parse(body);
      
      res.render('pages/contacts', {rows: rows});
    }
  });
});

module.exports = contactsRouter;
