let app =angular.module('mainApp', ['ngMaterial']).run(function($rootScope,$http,renotedServices){
    renotedServices.checkLogin().then(function successCallback(responseObj){
        $rootScope.isLoggedIn = true;
        $rootScope.$emit("loggedIn",{});
        
        
    },function errorCallback(responseObj){
        $rootScope.isLoggedIn = false;
        
        $rootScope.$emit("loggedIn",{});
    });
});

app.service("renotedServices",function($http,$q){
    
    this.checkLogin = function asyncGreet(name) {
      return $q(function(resolve, reject) {
            $http({
                method: 'GET',
                url: 'http://www.renoted.com/app'
            }).then(function successCallback(response) {
                if(response["data"]["model"]["userid"]) resolve(response);    
                else reject(response);
                }, function errorCallback(response) {
                console.log(response);
            });  
      });
    }
        
       
    
    
    
});