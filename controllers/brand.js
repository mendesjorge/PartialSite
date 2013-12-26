exports.install = function(framework) {
        framework.route('/marca/{name}', view_brand);
};

function view_brand(name){
    console.log(name);
	this.view(name);
}
