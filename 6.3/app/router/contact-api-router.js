const express          = require('express');
const multer           = require('multer');
const path             = require('path');
const fs               = require('fs');

const contactApiRouter = express.Router();
const Contacts         = require('../model/contact-model-mysql');
const contacts         = new Contacts();

let storage = multer.diskStorage({
  destination: function(req, res, cb) {
    cb(null, './uploads');
  },
  filename: function(req, file, cb) {
    cb(null, (path.parse(file.originalname)).name + '-' + Date.now() + '.png');
  }
});

contactApiRouter.get('/', function(req, res) {
  contacts.getAll(function(err, result) {
    if (err) {
      res.status(500).json({message: "Error retrieving record"});
      return;
    }
    res.status(200).json(result);
  });
});

contactApiRouter.get('/:contactId', function(req, res) {
  let id = parseInt(req.params.contactId);
  
  contacts.get(id, function(err, result) {
    if (err) {
      if (err.status === 404)
        res.status(404).json({message: 'Record does not exist!'});
      else
        res.status(500).json({message: 'Error retrieving record'});
      return;
    }
    res.status(200).json(result);
  });
});

contactApiRouter.post('/', multer({storage: storage}).single('imagePath'), function(req, res) {
  let newContact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phone: req.body.phone,
    imagepath: req.file !== undefined ? req.file.path : null
  };
  
  contacts.append(newContact, function(err, result) {
    if (err) {
      res.status(500).json({message: 'Error appending record!'});
      return;
    }
    res.status(201).json({message: 'Record appended!'});
  });
});

contactApiRouter.put('/:contactId', multer({storage: storage}).single('imagePath'), function(req, res) {
  let contactId = parseInt(req.params.contactId);
  
  contacts.get(contactId, function(err, result) {
    if (err) {
      if (err.status === 404)
        res.status(404).json({message: 'Record does not exist!'});
      else
        res.status(500).json({message: 'Error retrieving record!'});
      return;
    }
    
    let oldImagePath = result[0].imagePath;
    
    let oldContact = {
      contactId: contactId,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone,
      imagepath: req.file !== undefined ? req.file.path : oldImagePath
    };
    
    contacts.save(oldContact, function(err) {
      if (err) {
        res.status(500).json({message: 'Error saving record!'});
        return;
      }
      res.status(201).json({message: 'Record saved!'});
    });
    
  });
});

contactApiRouter.delete('/:contactId', function(req, res) {
  let contactId = parseInt(req.params.contactId);
  
  contacts.get(contactId, function(err, result) {
    if (err) {
      if (err.status === 404) {
        res.status(404).json({message: 'Record does not exist!'});
      } else {
        res.status(500).json({message: 'Error retrieving record!'});
      }
      return;
    }
    
    contacts.delete(contactId, function(err) {
      if (err) {
        res.status(500).json({message: 'Error saving record!'});
        return;
      }
      if (result[0].imagePath !== null) {
        fs.unlink(result[0].imagePath);
      }
        
      res.status(204).json({message: 'Record deleted!'});
    });
    
  });
});

module.exports = contactApiRouter;
