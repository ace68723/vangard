'use strict';

/**
 * @ngdoc service
 * @name vangardApp.Facebook
 * @description
 * # Facebook
 * Factory in the vangardApp.
 */
angular.module('vangardApp')
    .factory('Facebook', function ($rootScope) {
        return {
                getLoginStatus:function () {
                    FB.getLoginStatus(function (response) {
                        console.log('here')
                        $rootScope.$broadcast("fb_statusChange", {'status':response.status});
                    }, true);
                },
                login:function () {
                    FB.login(function(response) {
                      console.log(response)
                    }, {scope: 'email,user_likes,user_friends'});
                },
                getUserInfo:function() {
                    var _self = this;

                    FB.api('/me', function(res) {
                        console.log(res)
                      $rootScope.$apply(function() { 

                        $rootScope.user = _self.user = res; 

                      });

                    });
                },
                logout:function () {
                    FB.logout(function (response) {
                        console.log(response)
                        if (response) {
                            $rootScope.$broadcast('fb_logout_succeded');
                        } else {
                            $rootScope.$broadcast('fb_logout_failed');
                        }
                    });
                },
                unsubscribe:function () {
                    FB.api("/me/permissions", "DELETE", function (response) {
                        $rootScope.$broadcast('fb_get_login_status');
                    });
                }
            };  
    });
