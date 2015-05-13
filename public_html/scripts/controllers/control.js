'use strict';


angular.module('vangardApp')
	.controller('ControlCtrl', function ($http,$scope,FileUploader,API_URL) {
		var cc = this;
	    cc.hello = "ControlCtrl";

        cc.getSlides = function() {
            $http.get(API_URL +'control/getSlides')
                    
                    .success(function(data, status, headers, config) {
                        cc.slides = data.slides
                        console.log( cc.slides);
                    })
                    .error(function(data, status, headers, config) {
                        // called asynchronously if an error occurs
                        // or server returns response with an error status.
            });
        };
        console.log(API_URL)
        cc.getSlides();//init

        cc.removeSlide = function(id) {

            $http.post(API_URL + 'control/rmSlides', {slide_id: id})
                    
                    .success(function(data, status, headers, config) {
                        cc.getSlides();
                    })
                    .error(function(data, status, headers, config) {
                        alert(data)
            });
        };
       

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
                    console.log('onSuccessItem', fileItem, response, status, headers);
                    
                    var setSlides  = {};
                    setSlides.id   = fileItem.slideNo - 1 ; //id start from 0
                    setSlides.img  = fileItem.url + '/' + fileItem.file.name;

                    console.log(setSlides);
                    
                    $http.post(API_URL + 'control/setSlides', setSlides)
                    
                    .success(function(data, status, headers, config) {
                        cc.getSlides();
                    })
                    .error(function(data, status, headers, config) {
                        alert(data)
                    });
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
