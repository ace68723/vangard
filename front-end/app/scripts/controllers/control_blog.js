'use strict';

/**
 * @ngdoc function
 * @name vangardApp.controller:ControlBlogCtrl
 * @description
 * # ControlBlogCtrl
 * Controller of the vangardApp
 */
angular.module('vangardApp')
  	.controller('ControlBlogCtrl', function ($scope,$timeout,$http,API_URL,FileUploader) {
    	var cb = this;

    	cb.blogs = [{ img 	: '',
    				  title : 'How to build Ironman',
    				  date 	: 'May 3, 2015',
    				  author: 'D Zhang',
    				  brief : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ali-quam sollicitudin, turpis at vulputate vulputate, diam urna po-suere risus, et consectetur nunc tortor vel sapien. Suspendisse ut tempor sapien. Praesent orci odio, accumsan nec nibus eget, varius ut urna. Sed ultricies nunc mi, eu tristique nisl hen-drerit vitae. Pellentesque bibendum pretium viverra. Proin fau-cibus, lorem eu ecitur hendrerit, nulla enim ultrices leo, eu tincidunt enim enim eu sem. Maecenas at nisl dictum, tempor '

    				}
    	]
    	
    	// show / hide add blogs view
    		cb.show_add_blogs = function() {

    			cb.uploadBlog = {};

    			cb.close_add_blogs_view = false;
    			cb.add_blogs = true;
    		};
    		cb.close_add_blogs = function() {

    			cb.uploadBlog = {};
    			cb.addedImages	 = [];
    			cb.addedVideos	 = [];

    			
    			
    			cb.close_add_blogs_view = true;
    			$timeout(function() {
    				cb.add_blogs = false;
    			}, 500);
    		};
    		cb.save = function() {
    			console.log(cb.uploadBlog)
    			//for date + time test
    			cb.uploadBlog.date = '2015-05-04';

    			$http.post(API_URL + 'control/setBlogs', cb.uploadBlog)
    			
    			.success(function(data, status, headers, config) {
    			    // cc.getSlides();
    			    cb.uploadBlog = {};

    			    // cb.getProducts()
    			    cb.close_add_blogs();
    			})
    			.error(function(data, status, headers, config) {
    			    alert(data)
    			});
    		};

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
		                
		               
		                // setProducts.img  = fileItem.url + '/' + fileItem.file.name;
		                cb.uploadBlog.img = fileItem.url + '/' + fileItem.file.name;
		              
		                

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
