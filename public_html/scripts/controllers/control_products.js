'use strict';

/**
 * @ngdoc function
 * @name vangardApp.controller:ControlProductsCtrl
 * @description
 * # ControlProductsCtrl
 * Controller of the vangardApp
 */
angular.module('vangardApp')
  .controller('ControlProductsCtrl', function ($http,$scope,FileUploader,API_URL,$timeout) {
    var cp = this;


// show / hide add products view
	cp.show_add_products = function() {

		cp.uploadProduct = {};
		cp.addedImages	 = [];
		cp.addedVideos	 = [];

		cp.close_add_products_view = false;
		cp.add_products = true;
	};
	cp.close_add_products = function() {

		cp.uploadProduct = {};
		cp.addedImages	 = [];
		cp.addedVideos	 = [];

		
		
		cp.close_add_products_view = true;
		$timeout(function() {
			cp.add_products = false;
		}, 500);
	};

	cp.show_edit_products = function(id) {
		
		cp.edit_products = true;
		cp.uploadProduct = {};
		cp.uploadProduct = cp.products[id];
		cp.addedImages   = cp.uploadProduct.images;
		cp.addedVideos   = cp.uploadProduct.videos;
		
		if(!cp.addedImages){
			cp.addedImages = []
		}
		
		if(!cp.addedVideos){
			cp.addedVideos = []
		}

		cp.close_add_products_view = false;
		cp.add_products = true;
	};
	cp.close_edit_products = function() {
		cp.edit_products = false;

		cp.uploadProduct = {};
		cp.addedImages	 = [];
		cp.addedVideos	 = [];
		
		cp.getProducts();//init

		cp.close_add_products_view = true;
		$timeout(function() {
			cp.add_products = false;
		}, 500);
	};
// show / hide  add products view end

//get products
    cp.getProducts = function() {
        $http.get(API_URL +'control/getProducts')
                
                .success(function(data, status, headers, config) {
                    cp.products = data.products
                    cp.showProducts = true;
                    console.log( cp.products);
                })
                .error(function(data, status, headers, config) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
        });
    };
    cp.getProducts();//init
//get products    

//set products
        cp.addedImages = [];
        
        cp.addImages = function() {
        	cp.addedImages.push({img:''});
        };

        cp.removeImages = function(id) {
        	cp.addedImages.splice(id,1);
        };

        cp.addedVideos = [];
        
        cp.addVideos = function() {
        	cp.addedVideos.push({video:''});
        };

        cp.removeVideos = function(id) {
        	
        	cp.addedVideos.splice(id,1);
        };

        cp.uploadProduct = {};
        cp.save = function() {
        	cp.uploadProduct.images =  cp.addedImages;
        	cp.uploadProduct.videos =  cp.addedVideos;
        	console.log(cp.uploadProduct)

        	$http.post(API_URL + 'control/setProducts', cp.uploadProduct)
        	
        	.success(function(data, status, headers, config) {
        	    // cc.getSlides();
        	    cp.uploadProduct = {};
        	    cp.addedImages	 = {};
        	    cp.addedVideos	 = {};

        	    cp.getProducts()
        	    cp.close_add_products()
        	})
        	.error(function(data, status, headers, config) {
        	    alert(data)
        	});
        };
//set products end

// up loader
    var uploader = $scope.uploader = new FileUploader({
              url: API_URL + 'img'
          });

          // FILTERS

          uploader.filters.push({
              name: 'imageFilter',
              fn: function(item /*{File|FileLikeObject}*/, options) {
                  var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                  return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
              }
          });

          // CALLBACKS

          uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
              // console.info('onWhenAddingFileFailed', item, filter, options);
          };
          uploader.onAfterAddingFile = function(fileItem) {
              console.info('onAfterAddingFile', fileItem);
          };
          uploader.onAfterAddingAll = function(addedFileItems) {
              // console.info('onAfterAddingAll', addedFileItems);
          };
          uploader.onBeforeUploadItem = function(item) {
              console.info('onBeforeUploadItem', item);
          };
          uploader.onProgressItem = function(fileItem, progress) {
              // console.info('onProgressItem', fileItem, progress);
          };
          uploader.onProgressAll = function(progress) {
              // console.info('onProgressAll', progress);
          };
          uploader.onSuccessItem = function(fileItem, response, status, headers) {
                
                // console.log('onSuccessItem', fileItem, response, status, headers);
                
                var setProducts  = {};
                setProducts.img  = fileItem.url + '/' + fileItem.file.name;
                cp.addedImages.push( setProducts);
                

          };
          uploader.onErrorItem = function(fileItem, response, status, headers) {
              // console.info('onErrorItem', fileItem, response, status, headers);
          };
          uploader.onCancelItem = function(fileItem, response, status, headers) {
              // console.info('onCancelItem', fileItem, response, status, headers);
          };
          uploader.onCompleteItem = function(fileItem, response, status, headers) {
              // console.info('onCompleteItem', fileItem, response, status, headers);
          };
          uploader.onCompleteAll = function() {
              // console.info('onCompleteAll');
          };

          console.info('uploader', uploader);
// up loader end        
  });















