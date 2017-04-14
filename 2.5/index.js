const express     = require('express');
const app         = express(); 
const port        = 8080;
const url         = require('url');
const morgan      = require('morgan');

app.use(morgan('short'));

app.get('/', (req, res) => {
    const queryObject = url.parse(req.url, true).query;
    const greeting = queryObject.greeting || 'Default greeting';
    res.send('The Home Page ' + greeting);
})      

app.get('/greet/:statement', (req, res) => {
    const greeting = req.params.statement || 'Default greeting under /greeting';
    
    res.setHeader('token', 'my.little.secret');
    res.status(201).send('This is the greet url ' + greeting);
}) 

app.use( (req, res) => {
  res.status(404).send('Page not found. Try another page.')
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
