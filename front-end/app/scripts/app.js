'use strict';
// Ionic Starter App, v0.9.20

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('vangardApp', ['ionic','config', 'Vangard.controllers','angularFileUpload','videosharing-embed'])

.run(function($ionicPlatform, $window) {
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
  // facebook login
    $window.fbAsyncInit = function() {
        // Executed when the SDK is loaded

        FB.init({ 

          /* 
           The app id of the web app;
           To register a new app visit Facebook App Dashboard
           ( https://developers.facebook.com/apps/ ) 
          */

          appId: '435355203304828', 

          /* 
           Adding a Channel File improves the performance 
           of the javascript SDK, by addressing issues 
           with cross-domain communication in certain browsers. 
          */

          // channelUrl: 'app/channel.html', 

          /* 
           Set if you want to check the authentication status
           at the start up of the app 
          */

          status: true, 

          /* 
           Enable cookies to allow the server to access 
           the session 
          */

          cookie: true, 

          /* Parse XFBML */

          xfbml: true 
        });

        sAuth.watchAuthenticationStatusChange();

      };

      // Are you familiar to IIFE ( http://bit.ly/iifewdb ) ?

      (function(d){
        // load the Facebook javascript SDK

        var js, 
        id = 'facebook-jssdk', 
        ref = d.getElementsByTagName('script')[0];

        if (d.getElementById(id)) {
          return;
        }

        js = d.createElement('script'); 
        js.id = id; 
        js.async = true;
        js.src = "//connect.facebook.net/en_US/all.js";

        ref.parentNode.insertBefore(js, ref);

      }(document));
    // facebook login end
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

