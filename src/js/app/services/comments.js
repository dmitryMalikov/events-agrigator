(function () {
  angular.module('eva').service('CommentsService', ['$http', comments]);

  comments.$inject = ['$http'];
  
  function comments ($http) {
    return {
      getComments: function () {
        return $http.get('/api/commentsArray').then(function(resp){
            return resp.data;
        });
      }
    };
  }
})();