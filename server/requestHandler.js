var url = require('url');
var fs = require('fs');

function handle(request, response) {
    var pathname = url.parse(request.url).pathname.substring(1);
    console.log("Request for " + pathname + " received.");

    if (pathname == 'app/') {
        respondFile(pathname + "index.html", response);
        return;
    }

    fs.exists(pathname, function (exists) {
        if (exists) {
            respondFile(pathname, response);
            return;
        }

        pathname = pathname + ".json";

        fs.exists(pathname, function (exists) {
//            if (exists) {
                if (request.method == 'GET') {
                    respondFile(pathname, response);
                }
                else if (request.method == 'POST') {
                    fs.writeFile(pathname, '');
                    request.on('data', function (data) {
                        fs.appendFile(pathname, data, function (err) {
                            if (err) console.log("Error occurred while writing data " + err);
                        });
                        response.end();
                    });
                }
//            }
//            else {
//                response.writeHead(400, {"Content-Type": "text/plain"});
//                response.end();
//            }
        });
    });
}

function respondFile(pathname, response) {
    var fileContentTypeMap = {js: 'application/javascript', css: 'text/css', json: 'application/json'};
    var contentType = fileContentTypeMap[pathname.split('.').slice(-1)[0]];
    contentType = typeof contentType != undefined ? contentType : "text/html";
    fs.readFile(pathname, function (err, data) {
        if (err) {
            console.log(err);
            response.writeHead(500, {"Content-Type": "text/plain"});
        } else {
            response.writeHead(200, {"Content-Type": contentType});
            response.write(data);
        }
        response.end();
    })
}


exports.handle = handle;
