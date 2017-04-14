const express       = require('express');

const contactRouter = express.Router();

const Contacts = require('./contact-model');

const contacts = new Contacts();

contactRouter.get('/', (req, res) => {
  contacts.getAll( (err, result) => {
    if (err) {
      res.status(500).send(err.message);
      return;
    }
    res.status(200).json(result);
  })
});

contactRouter.get('/:contactId', (req, res) => {
  let contactId = parseInt(req.params.contactId);
  contacts.get(contactId, (err, result) => {
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

contactRouter.post('/', (req, res) => {
  let contactId = parseInt(req.body.contactId);
  contacts.get(contactId, (err, result) => {
    if (err && err.status !== 404) {
      res.status(500).send(err.message);
      return;
    }
    
    if (result !== undefined && result.contactId === contactId) {
      res.status(409).json({message: 'Record already exist!'});
      return;
    }
    
    contacts.append(req.body, err => {
      if (err) {
        res.status(500).send(err.message);
        return;
      }
      res.status(201).json({message: 'Record appended.'});
    });
  });
});

contactRouter.put('/:contactId', (req, res) => {
  let contactId = parseInt(req.params.contactId);
  contacts.get(contactId, (err, result) => {
    if (err) {
      if(err.status === 404) {
        res.status(404).send(err.message);
      } else {
        res.status(500).send(err.message);
      }
      return;
    }
    
    contacts.save(req.body, err => {
      if (err) {
        res.status(500).send(err.message);
        return;
      }
      res.status(201).json({message: 'Record saved!'});
    });
  });
});

contactRouter.delete('/:contactId', (req, res) => {
  let contactId = parseInt(req.params.contactId);
  contacts.get(contactId, (err, result) => {
    if (err) {
      if (err.status === 404) {
        res.status(404).send(err.message);
      } else {
        res.status(500).send(err.message);
      }
      return;
    }
    
    contacts.delete(contactId, err => {
      if (err) {
        res.status(500).send(err.message);
        return;
      }
      res.status(204).json({message: 'Record sucessfully deleted!'});
    });
  });
});

module.exports = contactRouter;
