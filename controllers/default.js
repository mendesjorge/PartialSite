var fs = require('fs');
var mongodb = require('mongodb').MongoClient;

var uri = 'mongodb://admin:administrator@ds033170.mongolab.com:33170/devtestdb';
var jfile = null;

//receives only lists of data
function dbInsert(dataList){

	mongodb.connect(uri,function(err,db){
		if(err === null){
			var colect = db.collection('news');
			colect.insert(dataList,function(err,result){
				if(err !== null){
					db.close();
					console.log(err);
					return false;
				}
			});
			return true;
		}
		console.log(err);
		return false;
	});
}

function dbSelectAll(callback){
	mongodb.connect(uri,function(err,db){
		if(err === null){
			var colect = db.collection('news');
			colect.find({}).toArray(function(err,data){
				if(err !== null)
					console.log(err);
				else
					callback(data);

			});
		}
	});
}

function convNewsTemplate(model){
	var prop = Object.keys(model);
	var ret = {link:null ,html:'' };

	var first = model[prop[0]];
	if(first.contains('img/news/')){
		ret.html = model[prop[1]];
		ret.link = first;
	} else{
		ret.html = first;
		ret.link = model[prop[1]];
	}

	return ret;

}

exports.install = function(framework) {
	  framework.route('/', view_homepage);

	  framework.route('/news', view_newsForm, ['authorize','get']);
	  framework.route('/news',post_news,['authorize','post']);
	  
	  framework.route('/login',view_login,['get']);
	  framework.route('/login',post_login,['post']);
	  framework.route('/logout',view_logout,['get']);

	  framework.route('/contactos',view_contacts);
	  framework.route('/vendas',view_sells);
	  framework.route('/assistencia',view_assist);
	  framework.route('/aluguer',view_rent);
	  framework.route('/pecas',view_parts);
	  framework.route('/quemsomos',view_info);
	  framework.route('#404', view_404);
	  
};

function view_newsForm(){
	var self = this;
	
	if(!this.user){
		this.view('login');
		return;
	}
	dbSelectAll(function(data){
		self.view('newsForm',data);
	});
}

function view_homepage() {
	  var self = this;
	  //jfile = JSON.parse(fs.readFileSync('contents/newsFile.json','utf8'));
	  dbSelectAll(function(data){
	  	self.view('homepage',data);
	  });
	  
}

function post_news(){
	var model = this.post;

	//jfile = [convNewsTemplate(model)].concat(jfile);
	dbInsert([convNewsTemplate(model)]);
	fs.writeFileSync('contents/newsFile.json',JSON.stringify(jfile));

	console.log(model);
	this.redirect('/news');

}

function view_login(){
	 console.log('entered view login');
	 if(!this.user)
		    this.view('login');
	  else this.redirect('/');
}

function post_login(){
	  var self = this;
	  //var validate = this.validate(this.post, ['LoginName', 'LoginPassword']);
	  
	  console.log('POST');

	  // if (this.user !== null)
	  //         validate.add('Logged');

	  // if (validate.hasError()) {
	  //         this.json(validate);
	  //         return;
	  // }

	  if(this.post.LoginName == 'maqman' && this.post.LoginPassword == 'maq'){

		    self.res.cookie(self.config.cookie, framework.encrypt({ id: 7, ip: self.req.ip }, 'user'), new Date().add('m', 30));

		    self.redirect('/news');
	  }
}

function view_logout(){
	this.res.cookie(this.config.cookie, '', new Date().add('y', -1));
	this.redirect('/');
}

function view_contacts(){
	  this.view('contactos');
}

function view_sells(){
	  this.view('vendas');
}

function view_assist(){
	  this.view('assistencia');
}
function view_rent(){
	  this.view('aluguer');
}
function view_parts(){
	  this.view('pecas');
}
function view_info(){
	this.view('quemsomos');
}

function view_404(){
	console.log('entered 404');
	  
	this.view('notfound');
}