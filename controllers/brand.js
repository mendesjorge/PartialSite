exports.install = function(framework) {
        framework.route('/marca/{name}', view_brand);
        // framework.onError = function(err,name,uri){
        // 	console.log("err:",err[0]," \nname:",name,"\nuri:",uri);
        // 	//if(err[0].contains()){}
        // };
};

function view_brand(name){
    console.log(name);
	this.view(name);
	
};
