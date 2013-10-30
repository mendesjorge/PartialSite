exports.install = function(framework) {
        framework.route('/machine/{name}', view_machine);
};

function view_machine(name){
    console.log(name);
	this.view(name);
}
