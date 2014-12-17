var framework = require('total.js').http('release');
var http = require('http');
var fs = require('fs');

var port = process.env.PORT || 8004;
var debug = true;

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

// server start


framework.run(http, debug, port);
console.log('http://{0}:{1}/',framework.ip, framework.port);