angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
      
    .state('parking', {
      url: '/side-menu21',
      abstract:true,
      templateUrl: 'templates/parking.html'
    })
      
    
      
        
    .state('parking.login', {
      url: '/page2',
      views: {
        'side-menu21': {
          templateUrl: 'templates/login.html',
          controller: 'loginCtrl'
        }
      }
    })
        
      
    
      
        
    .state('parking.signup', {
      url: '/page3',
      views: {
        'side-menu21': {
          templateUrl: 'templates/signup.html',
          controller: 'signupCtrl'
        }
      }
    })
        
      
    
      
        
    .state('parking.map', {
      url: '/page1',
      views: {
        'side-menu21': {
          templateUrl: 'templates/map.html',
          controller: 'mapCtrl'
        }
      }
    })
        
      
    
      
        
    .state('parking.orderHistory', {
      url: '/page4',
      views: {
        'side-menu21': {
          templateUrl: 'templates/orderHistory.html',
          controller: 'orderHistoryCtrl'
        }
      }
    })
        
      
    ;

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/side-menu21/page1');

});