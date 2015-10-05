var contollers = angular.module('CovalentFitness.controllers', [])

contollers.controller('AppCtrl', function($scope) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  // $scope.$on('$ionicView.enter', function(e) {
  // });

})

contollers.controller('SignupCtrl', function($scope, $location, Auth) {

  $scope.signupData = {};

  $scope.doSignup = function() {
    Auth.signup($scope.signupData)
      .then(function() {
        $location.path('/tab/workouts');
      })
      .catch(function(error) {
        console.error(error);
      });
  };
})

contollers.controller('LoginCtrl', function($scope, $location, Auth) {

  // Form data for the login
  $scope.loginData = {};

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    Auth.login($scope.loginData)
      .then(function() {
        $location.path('/tab/workouts');
      })
      .catch(function(error) {
        console.error(error);
      });

  };
})

contollers.controller('LogoutCtrl', function($scope, $location, Auth) {

  $ionicModal.fromTemplateUrl('views/logout.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.doLogout = function() {
    Auth.logout()
      .then(function() {
        $location.path('/signuplogin');
      })
      .catch(function(error) {
        console.error(error);
      });
  };
})

contollers.controller('UniversalFeedCtrl', function($scope, $location, Feed) {

  $scope.UniversalFeed = [];

  $scope.loadUniversalFeed = function() {
    Feed.getUniversalFeed()
      .then(function(feed) {
        $scope.UniversalFeed = feed;
      })
      .catch(function(error) {
        console.error(error);
      });
  };

  $scope.selectWorkout = function(wrkt) {
    $location.path('/tab/workout');
  };

  $scope.loadUniversalFeed();
  
})

contollers.controller('FollowingFeedCtrl', function($scope, $location, Feed, WorkoutServices) {

  $scope.FollowingFeed = [];

  $scope.loadFollowingFeed = function() {
    Feed.getFollowingFeed()
      .then(function(feed) {
        $scope.FollowingFeed = feed;
      })
      .catch(function(error) {
        console.error(error);
      });
  };

  $scope.selectWorkout = function(wrkt) {
    WorkoutServices.setWorkout(wrkt);
    $location.path('/tab/workout');
  };

  $scope.loadFollowingFeed();

});

contollers.controller('FollowingCtrl', function($scope) {

  $scope.followingUsers = [];

  $scope.loadFollowing = function() {
    Following.getFollowing()
      .then(function(followingUsers) {
        $scope.followingUsers = followingUsers;
      })
      .catch(function(error) {
        console.error(error);
      });
  };
})

contollers.controller('WorkoutsCtrl', function($scope, $location, $ionicPopup, WorkoutServices) {
  $scope.shouldShowDelete = false;
  $scope.listCanSwipe = true;
  $scope.workoutList = [];

  //functions for Workouts Controller ==========

  $scope.loadWorkoutList = function() {
    WorkoutServices.getAllWorkouts()
      .then(function(allWorkouts) {
        $scope.workoutList = allWorkouts;
      });
  };

  $scope.selectWorkout = function(wrkt) {
    WorkoutServices.setWorkout(wrkt);
    $location.path('/tab/workout');
  };

  $scope.addWorkout = function() {
    $scope.showPopup() // removed .then()
  };

  $scope.templateWorkout = function(wrkt) {
    WorkoutServices.setWorkout(wrkt)
      .then($location.path('/tab/editWorkout'));
  };

  $scope.editWorkout = function(wrkt) {
    WorkoutServices.setWorkout(wrkt);
  };

  $scope.loadWorkoutList();

  //==========

  $scope.showPopup = function() {
    $scope.newWorkout = {};
    var workoutPopup = $ionicPopup.show({
      template: '<input type="text" ng-model="newWorkout.name">',
      title: 'Enter New Workout Name',
      scope: $scope,
      buttons: [{
        text: 'Cancel' , onTap: function(e) { return true; }
      }, {
        text: '<b>Save</b>',
        type: 'button-positive',
        onTap: function(e) {
          if ($scope.newWorkout.name === undefined || $scope.newWorkout.name === null) {
            console.log('none entered');
            //don't allow the user to close unless he enters workout name
            e.preventDefault();
          } else {
            console.log($scope.newWorkout.name);
            WorkoutServices.addNewWorkout({
              name: $scope.newWorkout.name
            })
            .then(function(resp){
              resp.name = $scope.newWorkout.name;
              WorkoutServices.setNewWorkout(resp);
              console.log('in editWorkout', WorkoutServices.selectedWorkout);

            });
            return $scope.newWorkout.name;
          }
        }
      }, ]
    });

    workoutPopup.then(function(res) {
      workoutPopup.close();
      $location.path('/tab/editWorkout');
    });
  };

})


contollers.controller('WorkoutCtrl', function($scope, $location, WorkoutServices) {

  $scope.workout = null;

  //functions for Workout Controller ==========

  $scope.loadWorkout = function() {
    WorkoutServices.getSpecificWorkout()
      .then(function(specWorkout) {
        $scope.workout = specWorkout;
      });
  };

  $scope.editWorkout = function(wrkt) {
    WorkoutServices.setWorkout(wrkt)
      .then($location.path('/tab/editWorkout'));
  };



  $scope.loadWorkout();

})

contollers.controller('WorkoutEditsCtrl', function($scope, $location, $ionicModal, WorkoutServices) {

  // button func ==========
  $scope.shouldShowDelete = false;
  $scope.shouldShowReorder = false;
  $scope.listCanSwipe = true;

  //*****NOTE the modal is unfinished*****

  // modal for collection edit info ==========
  $ionicModal.fromTemplateUrl('../views/workouts/workoutEditsModal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal
  })

  $scope.openModal = function() {
    console.log('here');
    $scope.modal.show()
  }

  $scope.closeModal = function() {
    $scope.modal.hide();

  };

  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });

  //workoutedits controller vars and functions ==========
  $scope.currentWorkout = [];



  //right now edits send to server each time, maybe we can accumulate these here and send to server on 'save' or 'exit'.  We should talk about which we want.

  $scope.addEx = function() {
    $scope.openModal();
  };

  $scope.createMove = function(move) {
    console.log(move);
    WorkoutServices.addMoveToWorkout(move)
      .then(function() {
        $scope.loadCurrentWorkout();
        $scope.closeModal();
      });
  };

  $scope.editMove = function(move) {
    console.log(move);

    $scope.closeModal();
  };

  $scope.deleteEx = function(move) {
    WorkoutServices.deleteMoveFromWorkout(move)
      .then($scope.loadCurrentWorkout());
  };

  $scope.loadCurrentWorkout = function() {
    WorkoutServices.getSpecificWorkout()
      .then(function(specWorkout) {
        $scope.currentWorkout = specWorkout;
      });
  };

  //need to if check current WO (blank or current) and set initial state
  if (WorkoutServices.selectedWorkout.id === null) {
    $scope.currentWorkout = WorkoutServices.selectedWorkout;
    console.log($scope.currentWorkout);
  } else {
    $scope.loacCurrentWorkout();
  }
});
