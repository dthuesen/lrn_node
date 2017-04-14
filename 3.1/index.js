const express   = require('express');
const app       = express();
const port      = 8080;


const memberAPI = express.Router();

memberAPI.get('/', (req, res) => {
  res.send('Member page.')
});

memberAPI.get('/profile', (req, res) => {
  res.send('Member profile page.')
});

memberAPI.get('/changepassword', (req, res) => {
  res.send('Change password page.')
});

// This enables to remove repetetive url parts from the following get methods
const adminAPI = express.Router();
// the above const is prefixed with the below url part in the middle ware...
adminAPI.get('/', (req, res) => {
  res.send('Admin page.')
});

// ... and this prefixes the respective api parts
app.use('/api/member', memberAPI)
app.use('/api/admin', adminAPI)

app.use(express.static(__dirname + '/public'));

app.listen(port, () => {
  console.log(`Server listen on port ${port}`);
})
