var contactRecords = [
	{
		contactId: 1,
		firstName: 'John',
		lastName: 'Doe',
		email: 'john.doe@domain.com',
		phone: '987654'
	},
	{
		contactId: 2,
		firstName: 'Taylor',
		lastName: 'Swift',
		email: 'taylor.swift@domain.com',
		phone: '111222'
	}
];

var Contacts = function() {};

function recordNotFound(message) {
	Error.call(this);
	this.message = message;
	this.status = 404;
}

function getIndexInContactRecords(id) {
	var index = -1;

	for( var i = 0; i < contactRecords.length; i++ ) {
		if (contactRecords[i].contactId === id) {
			index = i;
			break;
		}
	}

	return index;
}

Contacts.prototype.get = function(contactId, callback) {
	try {
		var index = getIndexInContactRecords(contactId);
		if (index > -1) {
			callback(null, contactRecords[index]);
		} else {
			callback(new recordNotFound('Record does not exist!'));
		}
	} catch (err) {
		callback(err, null);
	}
};

Contacts.prototype.getAll = function(callback) {
	try {
		callback(null, contactRecords);
	} catch (err) {
		callback(err, null);
	}
};

Contacts.prototype.append = function(contact, callback) {
	try {
		contact.contactId = parseInt(contact.contactId);
		contactRecords.push(contact);
		callback(null);
	} catch (err) {
		callback(err);
	}
};

Contacts.prototype.save = function(contact, callback) {
	try {
		var contactId = parseInt(contact.contactId);
		var index = getIndexInContactRecords(contactId);

		contactRecords[index].contactId = contactId;
		contactRecords[index].firstName = contact.firstName;
		contactRecords[index].lastName = contact.lastName;
		contactRecords[index].email = contact.email;
		contactRecords[index].phone = contact.phone;
		callback(null);
	} catch (err) {
		callback(err);
	}
};

Contacts.prototype.delete = function(contactId, callback) {
	try {
		var index = getIndexInContactRecords(contactId);

		if (index > -1) {
			contactRecords.splice(index, 1);
			callback(null);
		} else {
			callback(new recordNotFound('Record cannot be deleted!'));
		}
	} catch (err) {
		callback(err);
	}
};

module.exports = Contacts;
