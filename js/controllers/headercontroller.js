'use strict';

angular.module('nmblisApp.controllers.header', ['nmblisApp.services.login'])
  .controller('HeaderController', ['$scope', '$location', 'loginService', 'angularFire', 'FBURL', 
    function($scope, $location, loginService, angularFire, FBURL) {

      $scope.$on('angularFireAuth:login', function() { 
        if ($scope.disassociateUserData) { 
            $scope.disassociateUserData();
        } 
        angularFire(new Firebase(FBURL+'/users/'+$scope.auth.id), $scope, 'user').then(function (disassociate) { 
            $scope.disassociateUserData = disassociate; 
        }); 
      });

      $scope.logout = function() {
        loginService.logout('/splash');
      };

      $scope.navbarEntries = [
        {
          "title": "Create",
          "link": "/create"
        }
      , {
          "title": "Library",
          "link": "/library"
        } 
      , {
          "title": "Archive",
          "link": "/archive"
        }      
      , {
          "title": "How To",
          "link": "/howto"
        }
      , {
          "title": "FAQ",
          "link": "/faq"
        } 
      ];
    
      $scope.$on('$routeChangeSuccess', function() {
        $scope.navbarEntries.forEach(
          function(data) {
            data.isActive = ($location.path().indexOf(data.link) == 0);
          }
        )
      })      

/*      $(document).on('click',function(){
        $('.collapse').collapse('hide');
      });*/

      $scope.collapse = function() {
        angular.element('.nmblis-navbar').removeClass('collapse in');
        angular.element('.nmblis-navbar').addClass('collapse'); 
      };
	  
}])