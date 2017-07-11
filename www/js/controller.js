// Todo Controller
app.controller('AppCtrl',function($scope,$firebaseObject){

	var ref = firebase.database().ref();
	$scope.name = $firebaseObject(ref);


	var abc = $scope.name;
	console.log(abc.first);

	setTimeout(function(){ console.log(abc.first); }, 3000);

	// $scope.saveTodo =  function(){
	// 	console.log($scope.name);
	// };

});
