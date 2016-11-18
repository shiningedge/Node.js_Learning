'use strict'

var 
	fs = require('fs'),
	url = require('url'),
	path = require('path'),
	http = require('http');

var root = path.resolve(process.argv[2]||'.');

console.log('static root dir:' + root);

var server = http.createServer(function(request, response) {
	var pathname = url.parse(request.url).pathname;
	var filepath = path.join(root,pathname);
	fs.stat(filepath, function(err, stats) {
		if(!err && stats.isFile()) {
			console.log('200'+request.url);
			response.writeHead(200);
			fs.createReadStream(filepath).pipe(response);
		}
		else if(!err && stats.isDirectory()) {
			
			fs.readdir(filepath, function(err, files) {
				if(err) {
					console.log('404' + resquest.url);
				}
				else {
					files.forEach(function(file) {
					if(file === 'index.html') {
						console.log('200'+ path.join(filepath,file));
						response.writeHead('200');
						fs.createReadStream(path.join(filepath,file)).pipe(response);
					}
					else {
						response.writeHead('200');
						response.end('fuck');
					}
				});
				}

			});

		}
		else {
			console.log('404' + request.url);
			response.writeHead(404);
			response.end('404 not found');
		}
	});
});

server.listen(8080);

console.log('server is running ');