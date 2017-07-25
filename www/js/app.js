// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('QueueT', ['ionic','firebase','ui.router'])

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

app.config(function($stateProvider, $locationProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/');

  $stateProvider
  .state('login', {
    url: '/login',
    // abstract: true,
    templateUrl: 'template/login.html',
    controller: 'AppCtrl',
    auth : false
  })
  .state('home', {
    url:'/',
    templateUrl: 'template/home.html',
    controller:'newVideoCtrl',
    auth : true
  })
  // For removing '#' from the url.
  $locationProvider.html5Mode(true);
})

// Login authentication and page redirection
app.run(function ($rootScope, $state, $firebaseObject, $firebaseAuth) {
  $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
    toState.auth &&
    firebase.auth().onAuthStateChanged(function(user) {
      // User isn’t authenticated
      if (!user) {
       $state.transitionTo("login");
       event.preventDefault();
      }
    });
  });
});

app.filter('trusted', ['$sce', function ($sce) {
    return function(url) {
            var video_id = url.split('v=')[1].split('&')[0];
        return $sce.trustAsResourceUrl("https://www.youtube.com/embed/" + video_id);
    };
}]);
