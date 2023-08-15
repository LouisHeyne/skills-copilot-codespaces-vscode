//create a webserver
var http = require('http');
var url = require('url');
var fs = require('fs');
var qs = require('querystring');
var path = require('path');
var port = 8080;
var comments = [];
var mimeTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.gif': 'image/gif',
    '.jpg': 'image/jpeg',
    '.png': 'image/png'
};
//create a server
http.createServer(function (req, res) {
    var pathname = url.parse(req.url).pathname;
    var ext = path.extname(pathname);
    var mimeType = mimeTypes[ext];
    var query = url.parse(req.url, true).query;
    var username = query.username;
    var comment = query.comment;
    var commentObj = {
        username: username,
        comment: comment
    };
    if (pathname === '/comment') {
        if (req.method === 'POST') {
            var body = '';
            req.on('data', function (data) {
                body += data;
            });
            req.on('end', function () {
                var query = qs.parse(body);
                comments.push(query);
                res.writeHead(302, {
                    'Location': '/'
                });
                res.end();
            });
        }
    } else if (pathname === '/comments.json') {
        res.writeHead(200, {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        });
        res.end(JSON.stringify(comments));
    } else {
        fs.readFile(pathname.substr(1), function (err, data) {
            if (err) {
                console.log(err);
                res.writeHead(404, {
                    'Content-Type': 'text/html'
                });
            } else {
                res.writeHead(200, {
                    'Content-Type': mimeType
                });
                res.write(data.toString());
            }
            res.end();
        });
    }
}).listen(port);
console.log('Server running at http://localhost:8080/');