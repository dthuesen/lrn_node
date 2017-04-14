const express     = require('express');
const app         = express(); 
const port        = 8080;
const url         = require('url');

app.get('/', (req, res) => {
    const queryObject = url.parse(req.url, true).query;
    const greeting = queryObject.greeting || 'Default greeting';
    res.send('This is my second node app! ' + greeting);
})      

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
