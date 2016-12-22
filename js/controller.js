app.controller("loginController",loginController);
app.controller("panelDialogControl",PanelDialogCtrl);
app.controller("homeController",homeController);

function homeController($http,$scope,$rootScope)
{
    let thisController = this;
    $rootScope.$on("loggedIn",function(){
        thisController.initialize();
    });
    
    
    thisController.initialize = function()
    {
        $scope.message = "done";
    }
    
    
}



function loginController($scope,$mdSidenav,$http,$window,$mdPanel,$rootScope,renotedServices)
{
    this._mdPanel = $mdPanel;
    this.openFrom = "button";
    this.closeTo = "button";
    this.disableParentScroll = false;
}

loginController.prototype.showDialog = function()
{
    let position = this._mdPanel.newPanelPosition()
      .absolute()
      .center();
    let animation = this._mdPanel.newPanelAnimation();
    animation.openFrom('.animation-target');
    animation.withAnimation(this._mdPanel.animation.SCALE);
    
    
  let config = {
    animation: animation,
    attachTo: angular.element(document.body),
    controller: PanelDialogCtrl,
    controllerAs: 'ctrl',
    disableParentScroll: this.disableParentScroll,
    templateUrl: 'panel.tmpl.html',
    hasBackdrop: true,
    panelClass: 'logInDialog',
    position: position,
    trapFocus: true,
    zIndex: 150,
    clickOutsideToClose: true,
    escapeToClose: true,
    focusOnOpen: true
  };

  this._mdPanel.open(config);
}

function PanelDialogCtrl(mdPanelRef,$scope,renotedServices,$http) {
  this._mdPanelRef = mdPanelRef;
    $scope.existing={
        "password":"test123",
        "username":"test"
    }
    $scope.existing.submit = function()
    {
        renotedServices.checkLogin().then(function successCallback(response){
           //Already logged in
            console.log(response);
            
        },function errorCallback(response){
            
            console.log('Content-Type','application/json','X-CSRF-Token',response["data"]["model"]["csrf"]);
            
            
            $http({
                 "cache-control": "no-cache",
                 "async": true,
                "crossDomain": true,
                "method": 'POST',
                "url": "http://renoted.com/app?__formid__=login",
                "data": {'username':'test','password':'test123'},
                "headers": {'Content-Type': 'application/json','x-csrf-token':response["data"]["model"]["csrf"]}
            }).then(function successCallback(response){
                 console.log("hey"+response);
             },function errorCallback(response){
                console.log(response); 
             });
            
        });
        
        
        
         
        
    
    }
    
    
}


