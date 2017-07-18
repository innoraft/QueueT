// Todo Controller
app.controller('AppCtrl',function($scope,$firebaseObject){
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
      console.log(user.displayName);
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
  $scope.checkLoginState = function checkLoginState() {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        console.log('signed in');
      } else {
        // No user is signed in.
        console.log('not signed in');
      }
    });
  };
  // function for loging out.
  $scope.logout = function logout() {
    firebase.auth().signOut().then(function() {
      // Sign-out successful.
      console.log("Sign-out successful");
    }, function(error) {
      // An error happened.
      console.log('An error happened');
    });
  }

});
