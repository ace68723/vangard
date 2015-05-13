'use strict';

/**
 * @ngdoc function
 * @name vangardApp.controller:MenuCtrl
 * @description
 * # MenuCtrl
 * Controller of the vangardApp
 */
angular.module('vangardApp')
  	.controller('MenuCtrl', function (Facebook,GooglePlus) {
    	var mc = this;
    	mc.facebook_login = function() {
            Facebook.login();
         };

        mc.google_login = function () {
           GooglePlus.login().then(function (authResult) {
               console.log(authResult);
   
               GooglePlus.getUser().then(function (user) {
                   console.log(user);
               });
           }, function (err) {
               console.log(err);
           });
        };
  	});
