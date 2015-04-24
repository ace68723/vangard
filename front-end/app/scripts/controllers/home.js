'use strict';

/**
 * @ngdoc function
 * @name vangardApp.controller:HomeCtrl
 * @description
 * # HomeCtrl
 * Controller of the vangardApp
 */
angular.module('vangardApp')
  	.controller('HomeCtrl', 
        function ($scope,$timeout,$ionicSlideBoxDelegate,$ionicScrollDelegate,$location,API_URL,$http,Facebook) {
   		var hc = this;
   		hc.paperClick = function(index) {
   			console.log(index)
   		};
   		hc.getSlides = function() {
                    $http.get(API_URL +'control/getSlides')
                            .success(function(data, status, headers, config) {
                                hc.slides = data.slides;
                                hc.showSlides = true;
                               console.log(hc.slides)
                            })
                            .error(function(data, status, headers, config) {
                                // called asynchronously if an error occurs
                                // or server returns response with an error status.
                    });
                };
        hc.getSlides();//init

        hc.getProducts = function() {
                 $http.get(API_URL +'control/getProducts')
                         .success(function(data, status, headers, config) {
                             hc.products = data.products;
                             hc.showProduct = true;
                            console.log(hc.products)
                         })
                         .error(function(data, status, headers, config) {
                             // called asynchronously if an error occurs
                             // or server returns response with an error status.
                 });
             };
        hc.getProducts(); //init



   		// hc.items = [{ 	description : 'Sometimes the scent of seasonal hand wash is all we need to rouse our holiday spirits.',
   		// 				img: 'img/item.png',
   		// 				name: 'Name of the Product',
   		// 				view: '123'
   		// 			},
   		// 			{ 	description : 'Sometimes the scent of seasonal hand wash is all we need to rouse our holiday spirits.',
   		// 				img: 'img/item.png',
   		// 				name: 'Name of the Product',
   		// 				view: '123'
   		// 			},
   		// 			{ 	description : 'Sometimes the scent of seasonal hand wash is all we need to rouse our holiday spirits.',
   		// 				img: 'img/item.png',
   		// 				name: 'Name of the Product',
   		// 				view: '123'
   		// 			},
   		// 			{ 	description : 'Sometimes the scent of seasonal hand wash is all we need to rouse our holiday spirits.',
   		// 				img: 'img/item.png',
   		// 				name: 'Name of the Product',
   		// 				view: '123'
   		// 			},
   		// 			{ 	description : 'Sometimes the scent of seasonal hand wash is all we need to rouse our holiday spirits.',
   		// 				img: 'img/item.png',
   		// 				name: 'Name of the Product',
   		// 				view: '123'
   		// 			},
   		// 			{ 	description : 'Sometimes the scent of seasonal hand wash is all we need to rouse our holiday spirits.',
   		// 				img: 'img/item.png',
   		// 				name: 'Name of the Product',
   		// 				view: '123'
   		// 			},
   		// 			{ 	description : 'Sometimes the scent of seasonal hand wash is all we need to rouse our holiday spirits.',
   		// 				img: 'img/item.png',
   		// 				name: 'Name of the Product',
   		// 				view: '123'
   		// 			},
   		// 			{ 	description : 'Sometimes the scent of seasonal hand wash is all we need to rouse our holiday spirits.',
   		// 				img: 'img/item.png',
   		// 				name: 'Name of the Product',
   		// 				view: '123'
   		// 			},
   		// 			{ 	description : 'Sometimes the scent of seasonal hand wash is all we need to rouse our holiday spirits.',
   		// 				img: 'img/item.png',
   		// 				name: 'Name of the Product',
   		// 				view: '123'
   		// 			}
   		// ]

   		hc.showDesc = function(id) {

               if (hc.showId == id) {
                hc.showId = null;
            } else{

                hc.showId = id;
            };
   			
   		};
   		hc.seeMore = function() {
   			for (var i = 16 - 1; i >= 0; i--) {
   				hc.items.push({ 	description : 'Sometimes the scent of seasonal hand wash is all we need to rouse our holiday spirits.',
   						img: 'img/item.png',
   						name: 'Name of the Product',
   						view: '123'
   					});
   			};
   			
   		};

         hc.showProView = function(id) {
            $timeout(function() {
                hc.product = hc.products[id]
                hc.creatSlides()
                console.log(hc.product);
            }, 500);
            hc.handle_showId = hc.showId;
            hc.showDesc(hc.showId);


            hc.proView = true;//ngif
            hc.showProduct = true;//ngshow

           

         };
          hc.closeProView = function() {
            // hc.product = {}; //init hc.product
            hc.product_slides = [];

            hc.showProduct = false; //ngshow
            $timeout(function() {
                 hc.proView = false; //ngif
                 hc.show_product_slides = false;

            },500)

            $timeout(function() {
               hc.showDesc(hc.handle_showId)
            },1000)

         };
         hc.facebook_logout = function() {
            Facebook.logout();
            
         };
         hc.facebook_get_user_info = function() {
           
            Facebook.getUserInfo();
         };
         hc.facebook_login = function() {
            Facebook.login();
         };

        hc.creatSlides = function() {
            hc.product_slides = [];
            _.forEach( hc.product.images, function(n, key) {
                hc.product_slides.push(n)
            });
            _.forEach( hc.product.videos, function(n, key) {
                var link = n.video;
                var video_id = link.split("=",2)[1]
                n.video_img = 'http://img.youtube.com/vi/' + video_id + '/1.jpg'
                hc.product_slides.push(n)
            });
            $timeout(function() {
                hc.show_product_slides = true;
            }, 500);
        }; 





             var slider = $ionicSlideBoxDelegate.$getByHandle('Slider');
             var nav = $ionicScrollDelegate.$getByHandle('Nav');
            $timeout(function() {
                   
                 }, 3000);
            
            function slideHasChanged(index){

                $scope.slideIndex = index;
                console.log(index);

                //slide(to,[speed]);
                //nav.slide(index,[500]);
                var navIndex = index - 3;
                $scope.doScroll("anchor" + navIndex);
               

            };

            function navHasChanged(index){
               $scope.slideIndex = index;
                console.log(index);
                console.log(nav.getScrollPosition())
                //slide(to,[speed]);
                slider.slide(index,[500]);
            }

            function doScroll(anchor) {
               console.log(anchor);

                $location.hash(anchor);
                $ionicScrollDelegate.anchorScroll(true);
            }

            function isSelectedNav(slideId){
                  return $scope.slideIndex !== null && $scope.slideIndex === slideId;
                  //return $scope.editedBookmark !== null && $scope.editedBookmark.id === bookmarkId;
                  //console.log($scope.editedBookmark !== null && $scope.editedBookmark.id === bookmarkId);
            }

            //console.log(nav.getScrollPosition());
            $scope.slideHasChanged = slideHasChanged;
            $scope.navHasChanged = navHasChanged;
            $scope.doScroll = doScroll;
            $scope.isSelectedNav = isSelectedNav;


            // $scope.menu = [
            //            { "id": 0, 
            //                   "name":'Starters',
            //                    "title":"Today's Featured Red Wine",
            //                    "imgUrl":'https://d13yacurqjgara.cloudfront.net/users/14268/screenshots/1206054/steak_1x.png',
            //                    "itemList":[ 
            //                            {"id": 0,
            //                           "OrderHistory" : 0,
            //                           "catgoryName":'Starters',
            //                           "imgURL" : "menu/Chickpea & Chorizo Fideos.jpg",
            //                           "name" : " Chickpea & Chorizo Fideos",
            //                           "page" : "page1",
            //                           "price" : 40,
            //                           "quantity" : 0
            //                         }, {"id": 1,
            //                           "OrderHistory" : 0,
            //                           "comment" : "comment",
            //                           "description" : "description",
            //                           "imgURL" : "menu/Sweet Potato Mac & Cheese.jpg",
            //                           "name" : "Sweet Potato Mac & Cheese",
            //                           "page" : "page2",
            //                           "price" : 30,
            //                           "quantity" : 0
            //                         }, {"id": 2,
            //                           "OrderHistory" : 0,
            //                           "comment" : "comment",
            //                           "description" : "description",
            //                           "imgURL" : "menu/8-Layer Taco Salad.jpg",
            //                           "name" : "8-Layer Taco Salad",
            //                           "page" : "page3",
            //                           "price" : 40,
            //                           "quantity" : 0
            //                         }, {"id": 3,
            //                           "OrderHistory" : 0,
            //                           "comment" : "comment",
            //                           "description" : "description",
            //                           "imgURL" : "menu/Apricot-Chile Glazed Salmon.jpg",
            //                           "name" : "Apricot-Chile Glazed Salmon",
            //                           "page" : "page4",
            //                           "price" : 50,
            //                           "quantity" : 0
            //                         }, {"id": 4,
            //                           "OrderHistory" : 0,
            //                           "comment" : "comment",
            //                           "description" : "description",
            //                           "imgURL" : "menu/Baked Tilapia Curry.jpg",
            //                           "name" : "Baked Tilapia Curry",
            //                           "page" : "page1",
            //                           "price" : 30,
            //                           "quantity" : 0
            //                         }, {"id": 5,
            //                           "OrderHistory" : 0,
            //                           "comment" : "comment",
            //                           "description" : "description",
            //                           "imgURL" : "menu/Broccoli & Feta Pasta Salad.jpg",
            //                           "name" : "Broccoli & Feta Pasta Salad",
            //                           "page" : "page2",
            //                           "price" : 20,
            //                           "quantity" : 0
            //                         }, {"id": 6,
            //                           "OrderHistory" : 0,
            //                           "comment" : "comment",
            //                           "description" : "description",
            //                           "imgURL" : "menu/Chicken Club Wraps.JPG",
            //                           "name" : "Chicken Club Wraps",
            //                           "page" : "page3",
            //                           "price" : 60,
            //                           "quantity" : 0
            //                         }, {"id": 7,
            //                           "OrderHistory" : 0,
            //                           "comment" : "comment",
            //                           "description" : "description",
            //                           "imgURL" : "menu/Chopped Chef’s Salad.JPG",
            //                           "name" : "Chopped Chef’s Salad",
            //                           "page" : "page4",
            //                           "price" : 50,
            //                           "quantity" : 0
            //                         }, {"id": 8,
            //                           "OrderHistory" : 0,
            //                           "comment" : "comment",
            //                           "description" : "description",
            //                           "imgURL" : "menu/Corn-Jalapeño Fritters.jpg",
            //                           "name" : "Corn-Jalapeño Fritters",
            //                           "page" : "page1",
            //                           "price" : 50,
            //                           "quantity" : 0
            //                         }, {"id": 9,
            //                           "OrderHistory" : 0,
            //                           "comment" : "comment",
            //                           "description" : "description",
            //                           "imgURL" : "menu/Crispy Chicken Schnitzel with Herb-Brown Butter.JPG",
            //                           "name" : "Crispy Chicken Schnitzel with Herb-Brown Butter.JPG",
            //                           "page" : "page2",
            //                           "price" : 50,
            //                           "quantity" : 0
            //                         }, {"id": 10,
            //                           "OrderHistory" : 0,
            //                           "comment" : "comment",
            //                           "description" : "description",
            //                           "imgURL" : "menu/Fettuccine Alfredo.JPG",
            //                           "name" : "Fettuccine Alfredo",
            //                           "page" : "page3",
            //                           "price" : 50,
            //                           "quantity" : 0
            //                         }, {"id": 11,
            //                           "OrderHistory" : 0,
            //                           "comment" : "comment",
            //                           "description" : "description",
            //                           "imgURL" : "menu/Linguine with Grilled Tuna, Capers and Parsley.jpg",
            //                           "name" : "Linguine with Grilled Tuna, Capers and Parsley",
            //                           "page" : "page4",
            //                           "price" : 50,
            //                           "quantity" : 0
            //                         }, {"id": 12,
            //                           "OrderHistory" : 0,
            //                           "comment" : "comment",
            //                           "description" : "description",
            //                           "imgURL" : "menu/Mint and Cumin-Spiced Lamb Chops.jpg",
            //                           "name" : "Mint and Cumin-Spiced Lamb Chops",
            //                           "page" : "page1",
            //                           "price" : 50,
            //                           "quantity" : 0
            //                         }, {"id": 13,
            //                           "OrderHistory" : 0,
            //                           "comment" : "comment",
            //                           "description" : "description",
            //                           "imgURL" : "menu/Moroccan Chicken Brochettes.jpg",
            //                           "name" : "Moroccan Chicken Brochettes",
            //                           "page" : "page2",
            //                           "price" : 50,
            //                           "quantity" : 0
            //                         }, {"id": 14,
            //                           "OrderHistory" : 0,
            //                           "comment" : "comment",
            //                           "description" : "description",
            //                           "imgURL" : "menu/Pasta with Grilled Sausage, Peppers and Eggplant.jpg",
            //                           "name" : "Pasta with Grilled Sausage, Peppers and Eggplant",
            //                           "page" : "page3",
            //                           "price" : 50,
            //                           "quantity" : 0
            //                         }, {"id": 15,
            //                           "OrderHistory" : 0,
            //                           "comment" : "comment",
            //                           "description" : "description",
            //                           "imgURL" : "menu/Pickled Shrimp.jpg",
            //                           "name" : "Pickled Shrimp",
            //                           "page" : "page4",
            //                           "price" : 50,
            //                           "quantity" : 0
            //                         }, {"id": 16,
            //                           "OrderHistory" : 0,
            //                           "comment" : "comment",
            //                           "description" : "description",
            //                           "imgURL" : "menu/Pork Milanese with Mashed Sweet Potato.JPG",
            //                           "name" : "Pork Milanese with Mashed Sweet Potato",
            //                           "page" : "page1",
            //                           "price" : 50,
            //                           "quantity" : 0
            //                         }, {"id": 17,
            //                           "OrderHistory" : 0,
            //                           "comment" : "comment",
            //                           "description" : "description",
            //                           "imgURL" : "menu/Risotto with Shrimp, Corn & Edamame.JPG",
            //                           "name" : "Risotto with Shrimp, Corn & Edamame",
            //                           "page" : "page2",
            //                           "price" : 50,
            //                           "quantity" : 0
            //                         }, {"id": 18,
            //                           "OrderHistory" : 0,
            //                           "comment" : "comment",
            //                           "description" : "description",
            //                           "imgURL" : "menu/Roasted Rhubarb Coupe with Macadamia Crumble.jpg",
            //                           "name" : "Roasted Rhubarb Coupe with Macadamia Crumble",
            //                           "page" : "page3",
            //                           "price" : 50,
            //                           "quantity" : 0
            //                         }, {"id": 19,
            //                           "OrderHistory" : 0,
            //                           "comment" : "comment",
            //                           "description" : "description",
            //                           "imgURL" : "menu/Seared Bluefish with Charred Corn, Warm Tomato Salad.jpg",
            //                           "name" : "Seared Bluefish with Charred Corn, Warm Tomato Salad",
            //                           "page" : "page4",
            //                           "price" : 50,
            //                           "quantity" : 0
            //                         }, {"id": 20,
            //                           "OrderHistory" : 0,
            //                           "comment" : "comment",
            //                           "description" : "description",
            //                           "imgURL" : "menu/Seared Chicken with Lemon-Herb Cream Sauce.JPG",
            //                           "name" : "Seared Chicken with Lemon-Herb Cream Sauce",
            //                           "page" : "page1",
            //                           "price" : 50,
            //                           "quantity" : 0
            //                         }, {"id": 21,
            //                           "OrderHistory" : 0,
            //                           "comment" : "comment",
            //                           "description" : "description",
            //                           "imgURL" : "menu/Skinny Guacamole.JPG",
            //                           "name" : "Skinny Guacamole",
            //                           "page" : "page2",
            //                           "price" : 50,
            //                           "quantity" : 0
            //                         }, {"id": 22,
            //                           "OrderHistory" : 0,
            //                           "comment" : "comment",
            //                           "description" : "description",
            //                           "imgURL" : "menu/Smoked Trout, Potato & Arugula Salad.JPG",
            //                           "name" : "Smoked Trout, Potato & Arugula Salad",
            //                           "page" : "page3",
            //                           "price" : 50,
            //                           "quantity" : 0
            //                         }, {"id": 23,
            //                           "OrderHistory" : 0,
            //                           "comment" : "comment",
            //                           "description" : "description",
            //                           "imgURL" : "menu/Spicy Lobster Pasta.jpg",
            //                           "name" : "Spicy Lobster Pasta",
            //                           "page" : "page4",
            //                           "price" : 50,
            //                           "quantity" : 0
            //                         }, {"id": 24,
            //                           "OrderHistory" : 0,
            //                           "comment" : "comment",
            //                           "description" : "description",
            //                           "imgURL" : "menu/Spinach Ravioli with Zucchini Ribbons.jpg",
            //                           "name" : "Spinach Ravioli with Zucchini Ribbons",
            //                           "page" : "page1",
            //                           "price" : 50,
            //                           "quantity" : 0
            //                         }, {"id": 25,
            //                           "OrderHistory" : 0,
            //                           "comment" : "comment",
            //                           "description" : "description",
            //                           "imgURL" : "menu/Sweet Bell Pepper and Onion Salad.jpg",
            //                           "name" : "Sweet Bell Pepper and Onion Salad",
            //                           "page" : "page2",
            //                           "price" : 50,
            //                           "quantity" : 0
            //                         }, {"id": 26,
            //                           "OrderHistory" : 0,
            //                           "comment" : "comment",
            //                           "description" : "description",
            //                           "imgURL" : "menu/Tarragon Lobster Roll.jpg",
            //                           "name" : "Tarragon Lobster Roll",
            //                           "page" : "page3",
            //                           "price" : 50,
            //                           "quantity" : 0
            //                         }, {"id": 27,
            //                           "OrderHistory" : 0,
            //                           "comment" : "comment",
            //                           "description" : "description",
            //                           "imgURL" : "menu/Thai Chicken Stir-Fry with Basil & Cashews.JPG",
            //                           "name" : "Thai Chicken Stir-Fry with Basil & Cashews",
            //                           "page" : "page4",
            //                           "price" : 50,
            //                           "quantity" : 0
            //                         }, {
            //                           "OrderHistory" : 0,
            //                           "comment" : "comment",
            //                           "description" : "description",
            //                           "imgURL" : "menu/Tilapia Po’Boy.JPG",
            //                           "name" : "Tilapia Po’Boy",
            //                           "page" : "page1",
            //                           "price" : 50,
            //                           "quantity" : 0
            //                         }, {"id": 28,
            //                           "OrderHistory" : 0,
            //                           "comment" : "comment",
            //                           "description" : "description",
            //                           "imgURL" : "menu/Tilapia with Grapefruit-Caper Sauce.JPG",
            //                           "name" : "Tilapia with Grapefruit-Caper Sauce",
            //                           "page" : "page2",
            //                           "price" : 50,
            //                           "quantity" : 0
            //                         } 
            //                      ]
            //          }  
            //     ];
            // $scope.slideList = $scope.menu[0].itemList;









  	});
