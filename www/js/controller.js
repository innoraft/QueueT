
app.controller('AppCtrl',function($scope,$firebaseObject,$firebaseAuth,$state,$ionicModal){

  var provider = new firebase.auth.GoogleAuthProvider();
	$scope.googleAuth =  function(){
    // firebase authentication with popup window.
    firebase.auth().signInWithPopup(provider).then(function(result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    	var token = result.credential.accessToken;
    	// The signed-in user info.
    	var user = result.user;
			$scope.$apply(function(){
				$scope.name=user.displayName;
			});
			$scope.name = user.displayName;
      // console.log(user.displayName);
      $state.go('home');
    }).catch(function(error) {
    	// Handle Errors here.
    	var errorCode = error.code;
    	var errorMessage = error.message;
    	// The email of the user's account used.
    	var email = error.email;
    	// The firebase.auth.AuthCredential type that was used.
    	var credential = error.credential;
    });

	};
  // login state checking function...
  // $scope.checkLoginState = function checkLoginState() {
  //   firebase.auth().onAuthStateChanged(function(user) {
  //     if (user) {
  //       // User is signed in.
  //       console.log('signed in');
  //     } else {
  //       // No user is signed in.
  //       console.log('not signed in');
  //     }
  //   });
  // };

  // function for loging out.
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
});

app.controller('newVideoCtrl',function($scope,$firebaseObject,$firebaseArray,$firebaseAuth,$state,$ionicModal,$firebase){

// retriving data from firebase
 // $scope.videos = [];

 var Refshow = firebase.database().ref('videos');
//  Refshow.on('value', function(snapshot) {
//     var obj = snapshot.val();
//     obj.forEach(function(data){
//         console.log(data.key()());
//     })
// });

  $scope.videos = $firebaseArray(Refshow);
 // Refshow.on('value',function(data){
  //   $scope.videos=[];
  //         for (var key in note) {
  //               if (note.hasOwnProperty(key)) {
  //                   note[key].key = key;
  //                   $scope.notes.push(note[key]);
  //               }
  //           }
 //    var video = data.val();
 //        $scope.videos = [];
 //        $timeout(function() {
 //            for (var key in note) {
 //                if (note.hasOwnProperty(key)) {
 //                    note[key].key = key;
 //                    $scope.notes.push(note[key]);
 //                }
 //            }
 //    $scope.videos.push(data.val());
 //    console.log(data.val());
 //    console.log($scope.videos);
 // });

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
          url: object.video_url,
          // embed: 
          }
          var ref = database.ref('videos');
          ref.push(newVideoData);
          object.video_title = "";
          object.video_url = "";     
          $scope.error_msg = "";
          // object.embed_url = 'https://www.youtube.com/embed/' + id + '?autoplay=0&enablejsapi=1';
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

    $scope.deleteVideo = function(object){
      var DelRef = firebase.database().ref('videos');
    //   var arr_ref=$firebaseArray(Delref);
    //   for(var i=0;i<arr_ref.length;i++){
    //     if(key==arr_ref[i].$id){
    //         console.log(arr_ref[i]);
    //         arr_ref.$remove(i);
    //     }
    // }
      console.log(object);
      // DelRef.child(object).remove();
      // console.log('deleted');
    }
  });
