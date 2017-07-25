
app.controller('AppCtrl',function($scope,$firebaseObject,$firebaseAuth,$state,$ionicModal,$firebaseArray){

  var provider = new firebase.auth.GoogleAuthProvider();

  // provider.addScope('https://www.googleapis.com/auth/plus.login');

	$scope.googleAuth =  function(){
    // firebase authentication with popup window.
		// $scope.name="abc";
    firebase.auth().signInWithPopup(provider).then(function(result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    	var token = result.credential.accessToken;
    	// The signed-in user info.
    	var user = result.user;
			// $scope.name = "hello";
			$scope.$apply(function(){
				$scope.name=user.displayName;
			});
			$scope.name = user.displayName;
      // $state.go('home');
      // console.log(user.displayName);
      // console.log('signed in');
      $state.go('home');
    }).catch(function(error) {
    	// Handle Errors here.
    	var errorCode = error.code;
    	var errorMessage = error.message;
    	// The email of the user's account used.
    	var email = error.email;
    	// The firebase.auth.AuthCredential type that was used.
    	var credential = error.credential;
    	// ...
    	// console.log("entering error");
    });

	};
  // login state checking function...
  // $scope.checkLoginState = function checkLoginState() {
  //   firebase.auth().onAuthStateChanged(function(user) {
  //     if (user) {
  //       // User is signed in.
  //       console.log('signed in');
  //       $state.go('home');
  //     } else {
  //       // No user is signed in.
  //       console.log('not signed in');
  //       $state.go('login');
  //     }
  //   });
  // };
});


app.controller('newVideoCtrl',function($scope,$firebaseObject,$firebaseArray,$firebaseAuth,$state,$ionicModal,$firebase){

  // function for loging out. (working)
  $scope.logout = function logout() {
    firebase.auth().signOut().then(function() {
      // Sign-out successful.
      console.log("successfully logged-out");
      $state.go('login');
    }, function(error) {
      // An error happened.
      console.log('Error occured');
    });
  }

//this is used for calling newNotes.html when users click on newNote button
  $scope.newVideo=function(){
  $scope.modalFirst.show()
}

// retriving data from firebase
  var Refshow = firebase.database().ref('videos');
  $scope.videos = $firebaseArray(Refshow);

  // For refreshing "all_video" array value..
  $scope.loadPage = function loadPage() {
    $scope.videos.$loaded()
    .then(function(){
        var all_video = [];
        angular.forEach($scope.videos, function(video) {
            $scope.checkVideo = video;
            var video = {id:video.$id, url:video.url, title:video.title}
            all_video.push(video);
        })
        $scope.all_video = all_video;
    });
  }

  // For deleting video from database and queue list...
  $scope.deleteVideo = function deleteVideo(id){
    // Confirmation alert message..
    var del = confirm("Are you sure, you want to delete ?");
    if (del == true){
      var database = firebase.database();
      var ref = database.ref('videos');
      ref.child(id).remove();
      $scope.loadPage();
    }
  }

  //this is used for calling newVideo.html when users click on newNote button
  $scope.newVideo=function(){
    $scope.modalFirst.show()
  }
  $ionicModal.fromTemplateUrl('template/newVideo.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modalFirst = modal;
  });

 //close modal form
 $scope.close = function(){
  $scope.modalFirst.hide();
  $scope.error_msg = '';
 }

 // Add new Video to Firebase
    $scope.add_video  = function(object) {

      //validate youtube url
        var url = object.video_url;
        var id = matchYoutubeUrl(url);
        if(id!=false){    //if valid add to firebase
          var database = firebase.database();
          var newVideoData = {
          title: object.video_title,
          url: object.video_url
          }
          var ref = database.ref('videos');
          ref.push(newVideoData);
          object.video_title = "";
          object.video_url = "";
          $scope.error_msg = "";
          $scope.loadPage();
          $scope.modalFirst.hide();
        }
        else{                 //else throw error if invalid
            $scope.error_msg = "invalid youTube url";
        }

         function matchYoutubeUrl(url) {
          var p = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
          var matches = url.match(p);
          if(matches){
              return matches[1];
          }
          return false;
          }
      }
  });
