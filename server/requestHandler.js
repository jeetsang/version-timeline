var url = require('url');
var fs = require('fs');

function handle(request, response) {
    var pathname = url.parse(request.url).pathname.substring(1)+".json";
    console.log("Request for " + pathname + " received.");

    fs.exists(pathname, function (exists) {
        if (exists) {
            if (request.method == 'GET') {
                fs.readFile(pathname, function (err, data) {
                    if (err) {
                        console.log(err);
                        response.writeHead(500, {"Content-Type": "text/plain"});
                    } else {
                        response.writeHead(200, {"Content-Type": "application/json"});
                        response.write(data);
                    }
                    response.end();
                });
            }
            else if (request.method == 'POST') {
                fs.writeFile(pathname,'');
                request.on('data', function (data) {
                    fs.appendFile(pathname, data, function (err) {
                        if (err) console.log("Error occurred while writing data " + err);
                    });
                    response.end();
                });
            }
        }
        else {
            response.writeHead(400, {"Content-Type": "text/plain"});
            response.end();
        }
    });
}

exports.handle = handle;
