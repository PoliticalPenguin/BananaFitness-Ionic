var app = angular.module('CovalentFitness', ['ionic', 'CovalentFitness.controllers', 'CovalentFitness.services']);

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
});

app.config(["$httpProvider", function($httpProvider) {
    $httpProvider.interceptors.push('middlewareAPI');
    $httpProvider.defaults.withCredentials = true;
}]);

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
});

app.config(function($stateProvider, $urlRouterProvider) {
  var stateProvider = $stateProvider;

  //Tab top level.
  stateProvider.state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: '../views/tabs.html'
  });

  //View all the workouts
  stateProvider.state('tab.workouts', {
    url: '/workouts',
    views: {
      'tab-workouts': {
        templateUrl: '../views/workouts/workouts.html',
        controller: 'WorkoutsCtrl'
      }
    }
  });

  //View the universal feed
  stateProvider.state('tab.universalfeed', {
    url: '/universalfeed',
    views: {
      'tab-universalfeed': {
        templateUrl: '../views/feeds/universalFeed.html',
        controller: 'UniversalFeedCtrl'
      }
    }
  });

    stateProvider.state('tab.settings', {
      url: '/settings',
      views: {
      'tab-settings': {
        templateUrl: '../views/settings/settings.html'
      }
    }
  });

  stateProvider.state('tab.workout', {
    url: '/tab/workout',
    templateUrl: '../views/workouts/workout.html',
    controller: 'WorkoutCtrl'
  });

  stateProvider.state('editWorkout', {
    url: '/tab/editWorkout',
    templateUrl: '../views/workouts/addEditWorkout.html',
    controller: 'WorkoutEditsCtrl'
  });

  stateProvider.state('signupLogin', {
    url: '/signuplogin',
    templateUrl: '../views/auth/signupLogin.html'
  });

  stateProvider.state('signup', {
    url: '/signup',
    templateUrl: '../views/auth/signup.html',
    controller: 'SignupCtrl'
  });

  stateProvider.state('login', {
      url: '/login',
      templateUrl: '../views/auth/login.html',
      controller: 'LoginCtrl'
  });


  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/signuplogin');
});
