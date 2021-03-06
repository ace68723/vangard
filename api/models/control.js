var Q 			= require('q');
var Firebase 	= require('firebase');
var dataRef 	= new Firebase('https://cm-restaurant.firebaseio.com/vangard');
var slidesRef 	= dataRef.child('slides');
var productsRef = dataRef.child('products');
var blogsRef 	= dataRef.child('blogs');


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

var getSlides = function() {
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

var setProducts = function(product_id, product) {
	var deferred = Q.defer();

	productsRef.child(product_id).set(product,function(error) {
	
		if (error) {

		  	deferred.reject(error);
		} else {
		   // res.status(200).json(newUser.email);
		   deferred.resolve(product)
		}
	});
	return deferred.promise;

};

var getProducts = function() {
	var deferred = Q.defer();

	productsRef.on("value", function(snapshot) {
	  	console.log(snapshot.val());
	  	var products = snapshot.val();
	   	deferred.resolve(products)
	}, function (errorObject) {
	  console.log("The read failed: " + errorObject.code);
	  	deferred.reject(errorObject.code);
	})
	return deferred.promise;
};

var setBlogs = function(date, blog) {
	var deferred = Q.defer();

	blogsRef.child(date).set(blog,function(error) {
	
		if (error) {

		  	deferred.reject(error);
		} else {
		   // res.status(200).json(newUser.email);
		   deferred.resolve(blog)
		}
	});
	// blogsRef.push(blog, function(error) {

	// 	if(error){
	// 			deferred.reject(error);
	// 	}else {
	// 		console.log(blog)
	// 	   deferred.resolve(blog)
	// 	}
	// });
	return deferred.promise;

};

var getBlogs = function() {
	var deferred = Q.defer();

	blogsRef.on("value", function(snapshot) {
	  	var blogs = snapshot.val();
	   	deferred.resolve(blogs)
	}, function (errorObject) {
	  console.log("The read failed: " + errorObject.code);
	  	deferred.reject(errorObject.code);
	})
	return deferred.promise;
};

module.exports = {
	setSlides	: setSlides,
	getSlides	: getSlides,
	rmSlides 	: rmSlides,
	setProducts : setProducts,
	getProducts : getProducts,
	setBlogs	: setBlogs,
	getBlogs	: getBlogs
}










