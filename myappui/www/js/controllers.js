angular.module('app.controllers', [])
     
.controller('loginCtrl', function($scope) {

})
   
.controller('signupCtrl', function($scope) {

})
   
.controller('mapCtrl', function($scope) {

})
   
.controller('orderHistoryCtrl', function($scope) {
	$scope.orders = 
	[
	    {title: "12/1/2015",  details:  "Deji Plaza", amount: "CNY  5.00"},
	    {title: "12/11/2015", details: "Wondercity",  amount: "CNY 10.00"},
	    {title: "12/21/2015", details: "Wanda Plaza", amount: "CNY 15.00"},
	];

})
 