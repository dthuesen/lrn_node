let mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/packtdb', (err, res) => {
  if (err) {
    console.log('Error connecting to localhost/packtdb');
    return;
  } else {
    console.log('Connected to localhost/packtdb');
  }
});

let contactPersonSchema = new mongoose.Schema({
  contactID: Number,
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  imagePath: String
});

let contactPerson = mongoose.model('contactPerson', contactPersonSchema, 'contactPerson');

let counterSchema = new mongoose.Schema({
  _id: {type: String, required: true},
  sequence_value: {type: Number, default: 0}
});

let counter = mongoose.model('counter', counterSchema);

contactPersonSchema.pre('save', (next) => {
  let doc = this;
  
  counter.findByIdAndUpdate(
    {_id: 'contactId'},
    {$inc: {sequence_value: 1}},
    function(err, counter) {
      if (err) {
        return next(err);
      }
      doc.contactId = counter.sequence_value;
      next();
    }
  );
});

var ContactsMongo = function() {};

function recordNotFound(message) {
	Error.call(this);
	this.message = message;
	this.status = 404;
}

ContactsMongo.prototype.get = function(contactId, callback) {
	var id = parseInt(contactId);

	contactPerson.find({contactId: id},
		function(err, rows) {
			if (!err) {
				if (rows.length > 0) {
					callback(null, rows);
				} else {
					callback(new recordNotFound('Record does not exist!'),
						{message: 'Record does not exist!'});
				}
			} else {
				callback(err, null);
			}
		});
};

ContactsMongo.prototype.getAll = function(callback) {
	contactPerson.find({},
		function(err, rows) {
			if (!err) {
				callback(null, rows);
			} else {
				callback(err, null);
			}
		});
};

ContactsMongo.prototype.append = function(contact, callback) {
	try {
    let newContact = new contactPerson({
      contactId: 0,
      firstName: contact.firstName,
      lastName: contact.lastName,
      email: contact.email,
      phone: contact.phone,
      imagePath: contact.imagePath
    });
    
		newContact.save(
			function(err) {
				if (err) {
					console.log(JSON.stringify(err));
					callback(err);
				} else {
					callback(null);
				}
			}
		);
	} catch (err) {
		callback(err);
	}
};

ContactsMongo.prototype.save = function(contact, callback) {
	try {
		let id = parseInt(contact.contactId);

		contactPerson.update(
      {contactIde: id},
      {$set: contact},
			function(err) {
				if (err) {
					console.log(JSON.stringify(err));
					callback(err);
				} else {
					callback(null);
				}
			}
		);
	} catch (err) {
		callback(err);
	}
};

ContactsMongo.prototype.delete = function(contactId, callback) {
	try {
    let id = parseInt(contact.contactId);
    
		contactPerson.remove(
			{contactIde: id},
			function(err, rows) {
				if (err) {
					console.log(JSON.stringify(err));
					callback(err);
				} else {
					callback(null);
				}
			}
		);
	} catch (err) {
		callback(err);
	}
};