(function () {
    angular.module('eva', []).controller('messageCtrl', function ($scope, $http) {
        
        $scope.user = {}
        $scope.items = []; 
        
        $scope.sendPost = function() {
            if ( $scope.user.newMessage !== "" && $scope.user.newMessage !== undefined ) {
                // ADD A NEW ELEMENT.
                $scope.items.push({ name: $scope.user.newName, message: $scope.user.newMessage });
                //SEND REQUEST
                $http.post("./events/events.json", $scope.user).success(function(data, status, headers) {
                    // CLEAR THE FIELDS.
                    $scope.user.newName = '';
                    $scope.user.newMessage = '';    
                })
            }
        }                   
    }) 
})();     


(function () {
  angular.module('eva').controller('StudsController', comments);

  comments.$inject = ['CommentsService'];

  function comments (ss) {
    var context = this;

    ss.getComments().then(function (commentsItemData) {
      context.commentsItem = commentsItemData;
    });
  }
})();
