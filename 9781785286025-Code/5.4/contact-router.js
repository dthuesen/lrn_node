var express = require('express');

var contactRouter = express.Router();

var Contacts = require('./contact-model');

var contacts = new Contacts();

contactRouter.get('/', function(req, res) {
	contacts.getAll(function(err, result) {
		if (err) {
			res.status(500).send(err.message);
			return;
		}
		res.status(200).json(result);
	});
});

contactRouter.get('/:contactId', function(req, res) {
	var contactId = parseInt(req.params.contactId);
	contacts.get(contactId, function(err, result) {
		if (err) {
			if (err.status === 404) {
				res.status(404).send(err.message);
			} else {
				res.status(500).send(err.message);	
			}			
			return;
		}
		res.status(200).json(result);
	});
});

contactRouter.post('/', function(req, res) {
	var contactId = parseInt(req.body.contactId);
	contacts.get(contactId, function(err, result) {
		if (err && err.status !== 404) {
			res.status(500).send(err.message);	
			return;
		}

		if (result !== undefined && result.contactId === contactId) {
			res.status(409).json({message: 'Record already exists!'});	
			return;
		}

		contacts.append(req.body, function(err) {
			if (err) {
				res.status(500).send(err.message);
				return;
			}

			res.status(201).json({message: 'Record appended!'});
		});		
	});
});

contactRouter.put('/:contactId', function(req, res) {
	var contactId = parseInt(req.params.contactId);
	contacts.get(contactId, function(err, result) {
		if (err) {
			if (err.status === 404) {
				res.status(404).send(err.message);	
			} else {
				res.status(500).send(err.message);	
			}
			return;
		}

		contacts.save(req.body, function(err) {
			if (err) {
				res.status(500).send(err.message);
				return;
			}

			res.status(201).json({message: 'Record saved!'});
		});		
	});
});

contactRouter.delete('/:contactId', function(req, res) {
	var contactId = parseInt(req.params.contactId);
	contacts.get(contactId, function(err, result) {
		if (err) {
			if (err.status === 404) {
				res.status(404).send(err.message);	
			} else {
				res.status(500).send(err.message);	
			}
			return;
		}

		contacts.delete(contactId, function(err) {
			if (err) {
				res.status(500).send(err.message);
				return;
			}

			res.status(204).json({message: 'Record deleted!'});
		});		
	});
});

module.exports = contactRouter;