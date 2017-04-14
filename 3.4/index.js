const express   = require('express');
const app       = express();
const port      = 8080;


// *** Enable the view engine *** ---------------------------------------------

// a) tell express where the templates are
app.set('views', './views')
// b) set the view engine to the wanted template engine
app.set('view engine', 'ejs')


// *** Implement the normal pages ***

app.get('/', (req, res) => {
  res.render('pages/four.ejs')
})

app.get('/three', (req, res) => {
  res.render('pages/three.ejs', {
    title: 'Page Three',
    tagline: 'Page three',
    message: 'Page Three - this is the Home Page made with EJS!'
  })
})


// *** Setting the routes for the member api *** ------------------------------

const memberAPI = express.Router();

memberAPI.get('/', (req, res) => {
  res.send('The member page.')
});

memberAPI.get('/profile', (req, res) => {
  res.send('Member profile page.')
});

memberAPI.get('/changepassword', (req, res) => {
  res.send('Change password page.')
});


// *** Setting the routes for the admin api *** -------------------------------

// This enables to remove repetetive url parts from the following get methods
const adminAPI = express.Router();
// the above const is prefixed with the below url part in the middleware...
adminAPI.get('/', (req, res) => {
  res.send('Admin page.')
});

// ... and this prefixes the respective api parts
app.use('/api/member', memberAPI)
app.use('/api/admin', adminAPI)


// *** Setting the path to the static files *** -------------------------------

app.use(express.static(__dirname + '/public'));


// *** Setup what port the server shlould listen *** --------------------------

app.listen(port, () => {
  console.log(`Server listen on port ${port}`);
})
