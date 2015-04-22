'use strict';


angular.module('vangardApp')
	.controller('ControlCtrl', function ($http,$scope,FileUploader) {
		var cc = this;
	    cc.hello = "ControlCtrl";

	    cc.slides = [{ 	id:1,
	    				img: 'img/item.png',
	    				link: ''
	    			},
	    			{ 	id:2,
	    				img: 'img/item.png',
	    				link: ''
	    			},
	    			{ 	id:3,
	    				img: 'img/item.png',
	    				link: ''
	    			}
	    ]

	    // cc.upload = function(image) {
     //        var formData = new FormData();
     //        formData.append('image', image[0]);
     //       	console.log(image)
     //        $http.post('http://localhost:3000/upload', image)
     //        .success(function(result) {
     //            $scope.uploadedImgSrc = result.src;
     //            $scope.sizeInBytes = result.size;
     //        });
     //    };

        var uploader = $scope.uploader = new FileUploader({
                  url: 'http://localhost:3000/img'
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
                  console.log('onSuccessItem', fileItem, response, status, headers);
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


	});
