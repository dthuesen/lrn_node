const http        = require('http');
const url         = require('url');

const port        = 8080 ;

const httpServer = http.createServer( (req, res) => {
  const queryObject = url.parse(req.url, true).query;
  const greeting = queryObject.greeting || 'default greeting';
  const anotherParam = queryObject.anotherParam || 'no another Param!'
  console.log(queryObject) 
  res.end('This is my second node app ' + greeting + '. And another param: ' + anotherParam)
});

httpServer.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
