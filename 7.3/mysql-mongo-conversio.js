let mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/packtdb', (err, res) => {
  if(err) {
    console.log('Error connecting to localhost/packtdb');
    return;
  } else {
    console.log('Connected to localhost/packtdb');
  }
});

let contactPersonSchema = new mongoose.Schema({
  contactId: Number,
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  imagePath: String
});

// For implementation of data validation see http://mongoosejs.com/

/**
 *  first argument  = name of the model
 *  second argument = name of corresponding Schema
 *  third argument  = name of the collection in mongodb
 * 
 *  If the third name is not provided, mongoose will create a pluralized version of the model name
 */
let contactPerson = mongoose.model('contactPerson', contactPersonSchema, 'contactPerson');

// a migration utility for the data in the mysql database:
let mysql = require('mysql');

let connection = mysql.createConnection({
  host: 'localhost',
	user: 'root',
	password: 'password',
	database: 'packtdb'
});

connection.connect();

function readMySQLContactPerson() {
  connection.query('SELECT * FROM contact_person', (err, rows) => {
    if(err) {
      console.log('Error reading MySQL database');
      return;
    }
    
    for (let i = 0; i < rows.length; i++) {
      saveMongoDBContactPerson(rows[i]);
    }
  })
}

function saveMongoDBContactPerson(contact) {
  let newContact = new contactPerson({
    contactId: contact.contactId,
    firstName: contact.firstName,
    lastName: contact.lastName,
    email: contact.email,
    phone: contact.phone,
    imagePath: contact.imagePath
  });
  
  newContact.save( (err) => {
    if (err) {
      console.log('Error adding record to MongoDB');
      return;
    }
    console.log(JSON.stringify(newContact, "", 2));
  });
}

readMySQLContactPerson();