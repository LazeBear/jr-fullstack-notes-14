const http = require('http');
const fs = require('fs');
const page = fs.readFileSync('./index.html');

const server = http.createServer((req, res) => {
  console.log(req.url, req.headers, req.method);

  if (req.url === '/hello') {
    // res.setHeader('Content-Type', 'text/html');
    res.write(page);
    res.end();
  }
  if (req.url === '/') {
    // res.write('hello world');
    // res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<header><title>My node app</title></header>');
    res.write('<body>');
    res.write('<p>Hello from <strong>Node</strong> sever!</p>');
    res.write('</body>');
    res.write('</html>');
    res.end();
  }

  if (req.url === '/api/data') {
    const user = [1, 2, 3, 4, 5];
    res.write(JSON.stringify(user));
    res.end();
  }
});

server.listen(3000);
