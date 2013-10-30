var framework = require('partial.js');
var http = require('http');
var fs = require('fs');

var port = 8004;
var debug = true;

//	methods

var errorPage = function(req,res){
	fs.readFile('./error/notfound.html',function(err, data){
		res.writeHead(404,{'Content-Type' : 'text/html'});
			res.write(data);
			res.end();

	});
};

// server start


framework.run(http, debug, port);
console.log('http://{0}:{1}/'.format(framework.ip, framework.port));