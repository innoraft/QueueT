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
    	console.log(user.displayName);
    	// ...
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

});
