'use strict';
// Ionic Starter App, v0.9.20

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('vangardApp', ['ionic','config', 'Vangard.controllers','angularFileUpload'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($ionicConfigProvider, $stateProvider, $urlRouterProvider) {
     // if(!ionic.Platform.isIOS())$ionicConfigProvider.scrolling.jsScrolling(false);
  $stateProvider

    .state('app', {
      url: '/app',
      abstract: true,
      templateUrl: 'templates/menu.html',
      controller: 'AppCtrl'
    })

    .state('control', {
      url: '/control',
      abstract: true,
      templateUrl: 'templates/controlMenu.html',
      controller: 'AppCtrl'
    })

    .state('control.slides', {
      url: '/slides',
      views: {
        'menuContent' :{
          templateUrl: 'templates/control.tpl.html',
          controller: 'ControlCtrl as cc'
        }
      }
    })
    .state('control.products', {
      url: '/products',
      views: {
        'menuContent' :{
          templateUrl: 'templates/controlProducts.tpl.html',
          controller: 'ControlProductsCtrl as cp'
        }
      }
    })

    .state('app.home', {
      url: '/home',
      views: {
        'menuContent' :{
          templateUrl: 'templates/home.tpl.html',
          controller: 'HomeCtrl as hc'
        }
      }
    })

    .state('app.about', {
      url: '/about',
      views: {
        'menuContent' :{
          templateUrl: 'templates/about.tpl.html'
        }
      }
    })
    .state('app.blog', {
      url: '/blog',
      views: {
        'menuContent' :{
          templateUrl: 'templates/blog.tpl.html',
        }
      }
    })
    .state('app.contact', {
      url: '/contact',
      views: {
        'menuContent' :{
          templateUrl: 'templates/contact.tpl.html',
        }
      }
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');
})
.constant('API_URL', 'http://localhost:3000/');

