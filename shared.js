var mongodb = require('mongodb').MongoClient;

var uri = 'mongodb://admin:administrator@ds033170.mongolab.com:33170/devtestdb';

module.exports = {

	dbase : undefined,
	times : 0,
	getDBConnection : function(runwith){
		
		var self = this;
		if(self.dbase !== undefined)
			return self.dbase;
		self.times+=1;
		mongodb.connect(uri,function(err,db){
			if(err !== null){
				console.log(err);
				return null;
			}
			if(runwith !== undefined){
				runwith();
			}
			self.dbase = db;
			return db;
		});
	}
};