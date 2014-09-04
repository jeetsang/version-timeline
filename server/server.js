var http = require('http');
var requestHandler = require('./requestHandler')

var hostname = "localhost";
var port = 8000;
if(process.argv.length > 2){
    hostname = process.argv[2];
    port = process.argv[3];
}

http.createServer(requestHandler.handle).listen(port, hostname);
console.log('Server running at http://'+hostname + ':'+ port);