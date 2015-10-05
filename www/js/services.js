var services = angular.module('CovalentFitness.services', [])

services.factory('Auth', function($http, $location, $window) {

  var auth = {};

  auth.signup = function(user) {
    return $http({
      method: 'POST',
      url: '/auth/signup',
      data: user
    })
    .then(function(resp) {
      return resp.data;
    });
  };

  auth.login = function(user) {
    return $http({
      method: 'POST',
      url: '/auth/signin',
      data: user
    })
    .then(function(resp) {
      return resp.data;
    });
  };

  auth.logout = function() {
    return $http({
      method: 'POST',
      url: '/auth/signup',
    })
    .then(function(resp) {
      return resp.data;
    });
  };

  return auth;
})

services.factory('Feed', function($http, $location, $window) {

  var feed = {};

  feed.getUniversalFeed = function(limit, lowestId) {
    return $http({
      method: 'GET',
      url: '', //fill in once API is confirmed
      params: {limit: limit, lowestId: lowestId}
    })
    .then(function(resp) {
      return resp.data;
    });
  };

  feed.getFollowingFeed = function(limit, lowestId) {
    return $http({
      method: 'GET',
      url: '', //fill in once API is confirmed
      params: {limit: limit, lowestId: lowestId}
    })
    .then(function(resp) {
      return resp.data;
    });
  };

  return feed;
})

services.factory('Following', function($http) {

  var following = {};

  following.getFollowing = function() {
    return $http({
      method: 'GET',
      url: '/api/follows/:' + user.id //This does not really work because of auth issues
    })
    .then(function(resp) {
      return resp.data
    })
  };

  return following;
})

//NOTE: I HAVENT PUT ROUTES TO SERVER IN YET, 

services.factory('WorkoutServices', function($http, $location, $window) {
  //wsi = workoutServicesInstance
  var wsi = {};

  wsi.selectedWorkout = {
    id: null
  };

  wsi.setWorkout = function(wrktID) {
    console.log('here');
    wsi.selectedWorkout.id = wrktID;
  };

  wsi.getAllWorkouts = function() {
    return $http({
      method: 'GET',
      url: '/api/workouts/e03fe43d-36a4-4506-aede-2d057f5dfe88' //I looked and can't find userid in the front end.  We can fix this later though.
    }).then(function(resp) {
      return resp.data;
    });
  };

  wsi.getSpecificWorkout = function() {
    console.log(wsi.selectedWorkout.id);
    return $http({
      method: 'GET',
      url: '/api/moves' + wsi.selectedWorkout.id,
    }).then(function(resp) {
      return resp.data;
    });
  };

  wsi.addMoveToWorkout = function(moveInfoObj) {
    return $http({
      method: 'POST', // need a backend route for put
      url: '/api/moves/',
      data: moveInfoObj
    }).then(function(resp) {
      return resp.data;
    });
  };

  wsi.editMoveInWorkout = function(oldMoveInfoObj, newMoveInfoObj) { // do ID for oldMoveInfoObj
    return $http({
      method: 'POST', // need a backend route for put
      url: '/api/moves/',
      data: {
        oldMoveInfoObj: oldMoveInfoObj,
        newMoveInfoObj: newMoveInfoObj
      }
    }).then(function(resp) {
      return resp.data;
    });
  };

  wsi.deleteMoveFromWorkout = function(moveInfoObj) { // change to ID
    return $http({
      method: 'DELETE', // need a backend route for delete
      url: '/api/moves/',
      data: moveInfoObj //specified workoutid, name, weight, rep, set
    }).then(function(resp) {
      return resp.data;
    });
  };

  return wsi;
});
