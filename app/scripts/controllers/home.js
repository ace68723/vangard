'use strict';

/**
 * @ngdoc function
 * @name vangardApp.controller:HomeCtrl
 * @description
 * # HomeCtrl
 * Controller of the vangardApp
 */
angular.module('vangardApp')
  	.controller('HomeCtrl', function () {
   		var hc = this;
   		hc.paperClick = function(index) {
   			console.log(index)
   		};
   		hc.test = "hello"
  	});
