var fs = require('fs');

var jfile = null;

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

	  framework.route('/contactos',view_contacts);
	  framework.route('/vendas',view_sells);
	  framework.route('/assistencia',view_assist);
	  framework.route('/aluguer',view_rent);
	  framework.route('/pecas',view_parts);
	  framework.route('#404', view_404);
	  
};

function view_newsForm(){

	if(!this.user){
		this.view('login');
		return;
	  }
	  jfile = JSON.parse(fs.readFileSync('contents/newsFile.json','utf8'));
	  this.view('newsForm',jfile);
}

function view_homepage() {
	  
	  jfile = JSON.parse(fs.readFileSync('contents/newsFile.json','utf8'));
	  this.view('homepage',jfile);
}

function post_news(){
	var model = this.post;

	jfile = [convNewsTemplate(model)].concat(jfile);
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
	  console.log(self.post);
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

function view_404(){
	console.log('entered 404');
	  
	this.view('notfound');
}