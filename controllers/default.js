exports.install = function(framework) {
        framework.route('/', view_homepage);
        framework.route('/contactos',view_contacts);
        framework.route('/vendas',view_sells)
        framework.route('#404', view_404);

};

function view_homepage() {
        this.view('homepage');
}

function view_contacts(){
        this.view('contactos');
}

function view_sells(){
        this.view('vendas');
}

function view_404(){
	console.log('entered 404');
        
	this.view('notfound');
}