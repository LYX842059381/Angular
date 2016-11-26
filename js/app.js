angular.module('myApp',['ngRoute','Controller','Service'])
 

.config(['$routeProvider',function  ($routeProvider) {
	$routeProvider
	.when('/home',{
		templateUrl:'template/home.html',
		controller:"homeController"
		
	})
	
	.when('/shop',{
		templateUrl:'template/indent.html',
		controller:'indentController'
	})
	
	.when('/xiangqing',{
		templateUrl:'template/xiangqing.html',
		controller:'xiangqingController'
	})
	
	.otherwise('/home')
}])