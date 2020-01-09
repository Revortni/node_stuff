const PORT = 9090;
const http = require('http');
const fs = require('fs');
const ext = '.txt';

const server = http.createServer((req, res) => {
  //request for http request obj
  //response for http response obj
  //runs for every http request regardless of any http method
  const request = req.url.split('/');
  const [, requestHeader, ...param] = request;
  const fileName = param[0];
  if (param.length <= 0) {
    res.end('Please pass a parameter along with the request.');
  }

  switch (requestHeader) {
    case 'write':
      fs.writeFile(fileName + ext, param[1], (err, done) => {
        if (err) {
          res.end(`Could not write to ${fileName}`);
        }
        res.end(`${fileName} was written`);
      });

    case 'read':
      fs.readFile(fileName + ext, (err, done) => {
        if (err) {
          console.log(err);
          res.end(`Could not read from ${fileName}`);
          return;
        }
        res.end(done);
      });

    case 'rename':
      const newFileName = param[1];
      fs.rename(fileName + ext, newFileName + ext, (err, done) => {
        if (err) {
          res.end(`Could not rename ${fileName}`);
        }
        res.end(`File renamed to ${newFileName} successfully.`);
      });

    case 'remove':
      fs.unlink(fileName + ext, (err, done) => {
        if (err) {
          res.end(`Could not delete ${fileName}`);
        }
        res.end(`${fileName} was deleted successfully.`);
      });

    default:
      res.end('Error');
  }
});

server.listen(PORT, err => {
  if (err) {
    console.log('Error in listening');
    return;
  }
  console.log(`Listening on port ${PORT}`);
});
