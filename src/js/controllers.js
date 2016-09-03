
//================================================
//# App Controllers
//================================================

/***********************
  Main
************************/

quest.controller('mainController', ['$rootScope', '$scope', '$location', '$cookies', 'AuthService', 'BoardService',
  function ($rootScope, $scope, $location, $cookies, AuthService, BoardService) {

    $rootScope.isLoading = false;
    $rootScope.activePage   = $location.path(); 
    $rootScope.userActive   = false;
    $rootScope.question     = false;
    $rootScope.special      = false;
    $rootScope.currentLevel = null;
    $rootScope.currentScore = null;
    $rootScope.levels       = [];
    $rootScope.score        = BoardService.getScore();
    $rootScope.boardData    = BoardService.getBoardData();

    $rootScope.activeHouse   = 0;
    $rootScope.score         = 0;
    $rootScope.answer        = 0;
    $rootScope.correctAnswer = 0;
    $rootScope.isQuestion = false;  
    $rootScope.userToken = false;  

    $rootScope.go = function (route) {
      $location.path(route);
    };

    $rootScope.setCookie = function(key, value){ 
 
      $cookies.putObject(key, value);
    };

    $rootScope.getCookie = function(key){
      $cookies.getObject(key);
    };

    $rootScope.deleteCookie = function(key){
      $cookies.remove(key);
      return  $location.path('/login');
    };
 
    $rootScope.$watch('isQuestion'); 

}]);

/***********************
  Login
************************/

quest.controller('authController',
  ['$rootScope', '$scope', '$location', '$http','$cookies', 'AuthService',
  function ($rootScope, $scope, $location, $http, $cookies, AuthService) {

    $rootScope.isLoading  = false;
    $rootScope.userActive = null;
    $rootScope.userToken  = false; 

    if($rootScope.activePage == "/logout"){
      return $rootScope.logout();
    }

    $rootScope.checkFields = function(){
      if($scope.loginForm.username && $scope.loginForm.password){
        return true;
      }else{
        return false;
      }
    };

    $rootScope.login = function () {

      // initial values
      $rootScope.error    = false;
      $rootScope.disabled = false; 
      // $rootScope.isLoading = true;


      if($rootScope.checkFields()){
        AuthService.login($scope.loginForm.username, $scope.loginForm.password) 
          .then(function () {
            $rootScope.isLoading = false;
            $rootScope.disabled = false;
            $scope.registerForm = {};  
            return  $location.path('/');
          })
          // handle error
          .catch(function () {
            $rootScope.error = true;
            $rootScope.errorMessage = "Something went wrong!";   
          })

      }else{
        $rootScope.error = true;
        $rootScope.errorMessage = "Preencha os campos para prosseguir";
      }

    };

    $rootScope.logout = function(){
      AuthService.logout()
          .then(function () {
            $location.path('/login');
          })
          // handle error
          .catch(function () {
            $rootScope.error = true;
            $rootScope.errorMessage = "Something went wrong!";   
          })
    };


}]);

/***********************
  Logout
************************/
quest.controller('logoutController',
  ['$rootScope', '$scope', '$location', 'AuthService',
  function ($rootScope, $scope, $location, AuthService) {
    $rootScope.isLoading = false;

    $rootScope.logout = function () {

      // call logout from service
      // AuthService.logout()
      //   .then(function () {
      //     $rootScope.userActive = false;
      //     $location.path('/login');
      //   });

    };

}]);

/***********************
  Register
************************/

quest.controller('registerController',
  ['$rootScope', '$scope', '$location', 'AuthService',
  function ($rootScope, $scope, $location, AuthService) {
    $rootScope.isLoading = false;

    $rootScope.register = function () {

      // initial values
      $rootScope.error = false;
      $rootScope.disabled = false;
      $rootScope.userActive = false;

      // // call register from service
      // AuthService.register($scope.registerForm.username, $scope.registerForm.password)
      //   // handle success
      //   .then(function () {
      //     $location.path('/login');
      //     $rootScope.disabled = false;
      //     $scope.registerForm = {};
      //   })
      //   // handle error
      //   .catch(function () {
      //     $rootScope.error = true;
      //     $rootScope.errorMessage = "Something went wrong!";
      //     $rootScope.disabled = false;
      //     $scope.registerForm = {};
      //   });

    };

}]);