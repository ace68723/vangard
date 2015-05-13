'use strict';


angular.module('vangardApp')
  	.controller('BlogCtrl', function ($timeout) {
    	var bc = this;

    	bc.setShowBlog = function() {
    		bc.showBlogView = true;
    		bc.showBlog = true;
    	};
    	bc.setCloseBlog = function() {
    		bc.showBlog = false;
    		$timeout(function() {
    			bc.showBlogView = false;
    		}, 500);
    		
    	};
  	});
