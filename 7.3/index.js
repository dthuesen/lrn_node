let express    = require('express');
let path       = require('path');
let morgan     = require('morgan');
let bodyParser = require('body-parser');

let app        = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// insert routers here
let contactsRouter = require('./app/router/contacts-router');

app.use('/', contactsRouter);

let profileRouter = require('./app/router/profile-router');

app.use('/profile', profileRouter);

let contactApiRouter = require('./app/router/contact-api-router');

app.use('/v1/contact', contactApiRouter);

let port = 3000;

app.listen(port, function() {
	console.log('listening on port ' + port);
});
