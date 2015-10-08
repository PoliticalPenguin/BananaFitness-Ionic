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
      url: '/auth/signout',
    })
    .then(function(resp) {
      return resp.data;
    });
  };

  auth.getPersonalInfo = function() {
    return $http({
      method: 'GET',
      url: '/api/user/me'
    })
    .then(function(resp) {
      return resp.data;
    });
  };

  return auth;
})

services.factory('Feed', function($http, $location, $window) {

  var feed = {};

  feed.getUniversalFeed = function() {
    return $http({
      method: 'GET',
      url: '/api/feed'
    })
    .then(function(resp) {
      return resp.data;
    });
  };

  feed.getUserFeed = function (id) {
    return $http({
      method: 'GET',
      url: '/api/user/' + id 
    })
    .then(function(resp) {
      return resp.data;
    });  
  }

  feed.getFollowingFeed = function() {
    return $http({
      method: 'GET',
      url: '/api/feed/me'
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
      url: '/api/follows/me'
    })
    .then(function(resp) {
      return resp.data
    })
  };

  // following.getUser = function(id) {
  //   return $http({
  //     method: 'GET',
  //     url: '/api/' + id
  //   })
  //   .then(function(resp) {
  //     return resp.data
  //   })
  // };

  return following;
})

//NOTE: I HAVENT PUT ROUTES TO SERVER IN YET, 

services.factory('WorkoutServices', function($http, $location, $window) {
  //wsi = workoutServicesInstance
  var wsi = {};

  wsi.selectedWorkout = {
    id: null,
    name: null
  };

  wsi.setWorkout = function(wrktID) {
    wsi.selectedWorkout.id = wrktID;
  };
  
  wsi.setNewWorkout = function(workout) {
    wsi.selectedWorkout = workout;
  };

  wsi.getAllWorkouts = function() {
    return $http({
      method: 'GET',
      url: '/api/workouts/me' //I looked and can't find userid in the front end.  We can fix this later though.
    }).then(function(resp) {
      return resp.data;
    });
  };

  wsi.getSpecificWorkout = function(wrktID) {
    wrktID = wrktID || wsi.selectedWorkout.id;
    if (wrktID) {
      return $http({
        method: 'GET',
        url: '/api/workout/' + wrktID
      }).then(function (resp) {
        return resp.data;
      });
    } else {
      console.log('We are not calling the DB because wrktID may be null or undefined. Here is wrktID: ', wrktID);
    }
  };

  wsi.getMovesInWorkout = function (wrktID) {
    if (wrktID) {
      return $http({
        method: 'GET',
        url: '/api/moves/' + wrktID
      }).then(function (resp) {
        return resp.data;
      });
    } else {
      console.log('We are not calling the DB because wrktID may be null or undefined. Here is wrktID: ', wrktID);
    }
  };
  
  wsi.addNewWorkout = function(newWorkoutObj) {
    return $http({
      method: 'POST', // need a backend route for put
      url: '/api/workout/',
      data: newWorkoutObj,
      headers: {'Content-Type': 'application/JSON'}
    }).then(function(resp) {
      console.log(resp);
      return resp.data;
    });
  };

  wsi.deleteWorkout = function(WorkoutObj) { // change to ID
    return $http({
      method: 'DELETE', 
      url: '/api/workout/' + wsi.selectedWorkout.id,
      data: WorkoutObj 
    }).then(function(resp) {
      return resp.data;
    });
  };

  wsi.addMoveToWorkout = function(moveInfoObj) {
    return $http({
      method: 'POST',
      url: '/api/move/',
      data: moveInfoObj,
      headers: {'Content-Type': 'application/json'}
    }).then(function(resp) {
      console.log("this is the data returned by addMoveToWorkout: ", resp.data);
      console.log("this is the ID of the workout we just created: ", resp.data.id);
      return resp.data;
    });
  };

  wsi.editMoveInWorkout = function(oldMoveInfoObj, newMoveInfoObj) { // do ID for oldMoveInfoObj
    return $http({
      method: 'POST', // need a backend route for put
      url: '/api/move/',
      data: {
        oldMoveInfoObj: oldMoveInfoObj,
        newMoveInfoObj: newMoveInfoObj
      },
      headers: {'Content-Type': 'application/json'}
    }).then(function(resp) {
      return resp.data;
    });
  };

  wsi.deleteMoveFromWorkout = function(moveInfoObj) { // change to ID
    return $http({
      method: 'DELETE', // need a backend route for delete
      url: '/api/move/',
      data: moveInfoObj //specified workoutid, name, weight, rep, set
    }).then(function(resp) {
      return resp.data;
    });
  };

  return wsi;
});
