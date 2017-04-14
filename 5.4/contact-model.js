let contactRecords = [
  {
    contactId: 1,
    firstName: 'John',
    lastName: 'Doe',
    email: 'jon.doe@domain.com',
    phone: '12345678' 
  },
  {
    contactId: 2,
    firstName: 'Taylor',
    lastName: 'Swift',
    email: 'taylor.swift@domain.com',
    phone: '368534987876' 
  },
  {
    contactId: 6,
    firstName: 'Detlef',
    lastName: 'von der Thuesen',
    email: 'detlef.vonderthuesen@domain.com',
    phone: '9876876790989796' 
  },
  {
    contactId: 4,
    firstName: 'Indre',
    lastName: 'von der Thuesen-Harkensee',
    email: 'indre.vonderthuesenharkenseedoe@domain.com',
    phone: '2022434939402' 
  },
  {
    contactId: 5,
    firstName: 'Max',
    lastName: 'Mustermann',
    email: 'max.mustermann@domain.com',
    phone: '5556663348720876' 
  },
];

let Contacts = function() {};

function recordNotFound(message) {
  Error.call(this);
  this.message = message;
  this.status = 404;
}

function getIndexInContactRecords(id) {
  let index = -1;
  
  for( let i = 0; i < contactRecords.length; i++ ) {
    if(contactRecords[i].contactId === id) {
      index = i;
      break;
    }
  }
  
  return index;
}

Contacts.prototype.get = (contactId, callback) => {
  try {
    let index = getIndexInContactRecords(contactId);
    if (index > -1) {
      callback(null, contactRecords[index]);
    } else {
      callback(new recordNotFound('Reord does not exist!c'));
    }
  } catch (err) {
    callback(err, null);
  }
};

Contacts.prototype.getAlll = (callback) => {
  try {
    callback(null, contactRecords);
  } catch (err) {
    callback(err, null);
  }
};

Contacts.prototype.append = (contact, callback) => {
  try {
    contact.contactId = parseInt(contact.contactId);
    contactRecords.push(contact);
    callback(null);
  } catch (err) {
    callback(err);
  }
};

Contacts.prototype.save = (contact, callback) => {
  try {
    let contactId = parseInt(contact.contactId);
    let index     = getIndexInContactRecords(contactId);
    
    contactRecords[index].contactId = contactId;
    contactRecords[index].firstName = contact.firstName;
    contactRecords[index].lastName  = contact.lastName;
    contactRecords[index].email     = contact.email;
    contactRecords[index].phone     = contact.phone;
    callback(null);
  } catch (err) {
    callback(err);
  }
};

Contacts.prototype.delete = (contactId, callback) => {
  try {
    let index = getIndexInContactRecords(contactId);
    
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
