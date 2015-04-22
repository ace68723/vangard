var Q = require('q');
var Firebase = require('firebase');
var dataRef = new Firebase('https://cm-restaurant.firebaseio.com/jwt');
var userRef = dataRef.child('user')
var FirebaseTokenGenerator = require("firebase-token-generator");

var tokenGenerator = new FirebaseTokenGenerator("dgj7b8TQaGO9P629UxsGRBJBI8oZYmT7PS761Mms");

	
var creatAccount = function(newUser) {
	var deferred = Q.defer();
	dataRef.createUser({
	  email    : newUser.email,
	  password : newUser.password
	}, function(error, userData) {
	  if (error) {
	    // console.log("Error creating user:", error);
	    deferred.reject(error);
	  } else {
	    // console.log("Successfully created user account with uid:", userData);
	    deferred.resolve(userData);
	  }
	});

	return deferred.promise;
};

var loginWithPass = function(user){
	var deferred = Q.defer();

	dataRef.authWithPassword({
	  email    : user.email,
	  password : user.password
	}, function(error, authData) {
	  if (error) {
	    console.log("Login Failed!", error);
	    deferred.reject(error);
	  } else {
	    console.log("Authenticated successfully with payload:", authData);
	    deferred.resolve(authData);
	  }
	});

	return deferred.promise;
};

var loginWithToken = function(token) {
	var deferred = Q.defer();

	dataRef.authWithCustomToken(token, function(error, authData) {
	  if (error) {
	    // console.log("Login Failed!", error);
	    deferred.reject(error);
	  } else {
	    
	    // console.log("Authenticated successfully with payload:", authData);
	    deferred.resolve(authData);
	  }
	});

	return deferred.promise;
};

var setUserData = function(authData) {
	var deferred = Q.defer();
	
	userRef.child(authData.uid).set(authData,function(error) {
	
		if (error) {

		  	deferred.reject(error);
		} else {
		   // res.status(200).json(newUser.email);
		   deferred.resolve(authData.token)
		}
	});

	return deferred.promise;
};



var register = function(newUser) {
	var deferred = Q.defer();//register defer -R
	creatAccount(newUser)
	
		.then(function(userData) {
			console.log('creat account');
			return userData;
		})
		
		.then(function(userData) {
			var deferred = Q.defer();//login with token defer -L
			
			console.log('creat token')
			var token = tokenGenerator.createToken({
							uid: userData.uid,
							username: 'aiden',
							some: "arbitrary", 
							data: "here"});

			newUser.token = token;
			

			loginWithToken(newUser.token)
				.then(function(authData) {
					console.log('login with token')
					deferred.resolve(authData);//login with token resolve -L
				})
				.catch(function(error) {
					deferred.reject(error);//login with token reject -L
				})

			return deferred.promise;//return login with token promise -L
		})

		.then(function(authData) {
			var deferred = Q.defer();// set user data defer -S

			setUserData(authData)
				.then(function(token) {
					console.log('set userdata successfully')
					var sentTokenBack = token
					deferred.resolve(token);//set user data resolve -S
				})
				.catch(function(error) {
					deferred.reject(error);//set user data reject -S
				})
			return deferred.promise;//return user data promise -S
		})

		.then(function(sentTokenBack) {
			console.log('sentTokenBack')
			deferred.resolve(sentTokenBack); //register resolve -R
		})

		.catch(function(error) {
			console.log('error all',error);
			deferred.reject(error);//register reject -R
		})

		.finally(function() {
			
			console.log('finally')
		})

	return deferred.promise;//return register promise -R
};

module.exports = {
	register: register
}