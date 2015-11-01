var framework = require('total.js');
var http = require('http');
var fs = require('fs');
var shared = require('./shared.js');

var port = process.env.PORT || 8004;
var debug = port == 8004;

//	methods

var errorPage = function(req,res){
	fs.readFile('./error/notfound.html',function(err, data){
		res.writeHead(404,{'Content-Type' : 'text/html'});
			res.write(data);
			res.end();

	});
};


framework.onAuthorization = function(req,res,flags,next){
	var cookie = req.cookie(this.config.cookie);

	if (cookie === null || cookie.length < 10) {
		next(false);
		return;
	}
	
	var userId = this.decrypt(cookie,'user').id;

	if (userId === 0 && userId !== 7){
		next(false);
		return;
	}
	req.user = 7;
	next(true);
};

// server start with db

shared.getDBConnection(function(){
	framework.run(http, debug, port);
	console.log('http://%s:%d/',framework.ip, framework.port);
});