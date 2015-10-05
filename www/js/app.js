var app = angular.module('CovalentFitness', ['ionic', 'CovalentFitness.controllers', 'CovalentFitness.services'])

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

app.config(["$httpProvider", function($httpProvider) {
    $httpProvider.interceptors.push('middlewareAPI');
    $httpProvider.defaults.withCredentials = true;
}])

app.factory('middlewareAPI', function() {
    return {
        request: function(config) {
            var url = config.url;
            var pathArray = url.split('/');
            var firstPath = pathArray[1];
            if ((firstPath === 'api') || (firstPath === 'auth')){
              config.url = "https://covalent-fitness-api.herokuapp.com" + config.url;
            }
            return config;
        }
    };
})

app.config(function($stateProvider, $urlRouterProvider) {
  var stateProvider = $stateProvider

  stateProvider.state('menu', {
    url: '/app/menu',
    abstract: true,
    templateUrl: '../views/menu.html',
    controller: 'AppCtrl'
  })

  // Using views because logout is a subview of menu
  stateProvider.state('menu.logout', {
    url: '/app/menu/logout',
    views: {
      'menuContent': {
        templateUrl: '../views/logout.html'
      }
    }
  })

  stateProvider.state('signupLogin', {
    url: '/app/signuplogin',
    templateUrl: '../views/signinLogin.html'
  })

  stateProvider.state('signup', {
    url: '/app/signup',
    templateUrl: '../views/signup.html',
    controller: 'SignupCtrl'
  })

  stateProvider.state('login', {
      url: '/app/login',
      templateUrl: '../views/login.html',
      controller: 'LoginCtrl'
  })
  // route to list of universal feed of workouts
  stateProvider.state('universalfeed', {
    url: '/app/universalfeed',
    templateUrl: '../views/universalFeed.html',
    controller: 'UniversalFeedCtrl'
  })
  // route to list of workouts from people whom you are following
  stateProvider.state('followingfeed', {
    url: '/app/followingfeed',
    templateUrl: '../views/followersFeed.html',
    controller: 'FollowingFeedCtrl'
  })
  // route to list of people whom you are following
  stateProvider.state('following', {
    url: '/app/following',
    templateUrl: '../views/followersList.html',
    controller: 'FollowingCtrl'
  })
  // route to list of workouts
  stateProvider.state('workouts', {
    url: '/app/workouts',
    templateUrl: '../views/workouts.html',
    controller: 'WorkoutsCtrl'
  })
  // route to individual workout view
  stateProvider.state('workout', {
    url: '/app/workout',
    templateUrl: '../views/workout.html',
    controller: 'WorkoutCtrl'
  })
  // route to workout editor (for new or edit workout)
  stateProvider.state('editWorkout', {
    url: '/app/editWorkout',
    templateUrl: '../views/addEditWorkout.html',
    controller: 'WorkoutEditsCtrl'
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/signuplogin');
});
