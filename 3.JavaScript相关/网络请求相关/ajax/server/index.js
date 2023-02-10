const http = require('http')

http.createServer(function (request, response) {
  console.log(request.url)
  if (request.url === '/') {
    response.end('456')
  }
  if (request.url === '/get') {
    response.end('123')
  }
}).listen(8888);

console.log('server listining on 8888')