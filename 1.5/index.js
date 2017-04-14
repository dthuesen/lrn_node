const http        = require('http');

const port        = 8080 ;
const httpServer  = http.createServer( (req, res) => {
  res.end('This is my first node app')
});

httpServer.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
