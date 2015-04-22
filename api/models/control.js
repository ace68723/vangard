var Q 			= require('q');
var Firebase 	= require('firebase');
var dataRef 	= new Firebase('https://cm-restaurant.firebaseio.com/vangard');
var slidesRef 	= dataRef.child('slides')

var setSlides = function(imgNo, imgPath) {
	var deferred = Q.defer();

	slidesRef.child(imgNo).set(imgPath,function(error) {
	
		if (error) {

		  	deferred.reject(error);
		} else {
		   // res.status(200).json(newUser.email);
		   deferred.resolve(imgPath)
		}
	});
	return deferred.promise;

};

var getSlides = function(imgNo, imgPath) {
	var deferred = Q.defer();

	slidesRef.on("value", function(snapshot) {
	  	console.log(snapshot.val());
	  	var slides = snapshot.val();
	   	deferred.resolve(slides)
	}, function (errorObject) {
	  console.log("The read failed: " + errorObject.code);
	  	deferred.reject(errorObject.code);
	})
	return deferred.promise;
};

var rmSlides = function(slide_id) {
	var deferred 	= Q.defer();
	var rmSlide 	= slidesRef.child(slide_id)

	rmSlide.remove(function(error) {

		if (error) {
		    console.log('Synchronization failed');
		} else {
		    deferred.resolve('slide '  + slide_id + ' remove succeeded')
		}
	});

	return deferred.promise;
};

module.exports = {
	setSlides: setSlides,
	getSlides: getSlides,
	rmSlides : rmSlides
}