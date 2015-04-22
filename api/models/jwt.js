var Q = require('q');
var jwt = require('jsonwebtoken');
var jwtSecret = 'dgj7b8TQaGO9P629UxsGRBJBI8oZYmT7PS761Mms';

exports.decode = function(token) {
	var deferred = Q.defer();

	var segements = token.split('.');

	//jwt always has three parts: header payload signature
	if(segements.length !== 3){
		throw new Error('Token structure incorrect');
	}
	
	jwt.verify(token, jwtSecret, function(err, decoded) {
		

		var jwt_decoded;

		if(decoded){
			var jwt_decoded = decoded;
			deferred.resolve(jwt_decoded);
		}else{
			deferred.reject(err);
		}
		
		
		
	 
	});
	
	return deferred.promise;
	

};