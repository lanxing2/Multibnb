var app = angular.module('loginApp', []);
app.controller('loginCtrl', function($scope,$http,$window) {
    $scope.showLogin = true;
    $scope.userlog = {username:"",password:""};
    $scope.userreg = {username:"",email:"",password:"",password2:""};
    $scope.switchLogin = function() {
        $scope.showLogin = !$scope.showLogin;
    }
    $scope.login = function(){
    	var data = {
    		name : $scope.userlog.username,
    		password : $scope.userlog.password
    	}
        $http.post('/login',data).success(function(data, status, headers, config) {
            if(data.msg=="success"){
                $window.location.href = "/home";
            }else{
                $scope.errlog=data.msg;
            }
        }).error(function(data, status) {
            $scope.errlog="Connection Error";
        });
    }
    $scope.regist = function(){
    	var data = {
    		name : $scope.userreg.username,
    		email : $scope.userreg.email,
    		password : $scope.userreg.password,
    		password2 : $scope.userreg.password2
    	}
        $http.post('/reg',data).success(function(data, status, headers, config) {
            if(data.msg=="success"){
                $window.location.href = "/home";
            }else{
                $scope.errreg=data.msg;
            }
        }).error(function(data, status) {
            $scope.errlog="Connection Error";
        });
    }    

    $scope.disableLogButton = true;
    $scope.checklog = function(){
        if($scope.userlog.username!=''&& $scope.userlog.password!=''){
            $scope.disableLogButton = false;
        }else{
            $scope.disableLogButton = true;
        }
    };

    $scope.disableRegButton = true;
    $scope.dupPass = true;
    $scope.checkreg = function(){
        if($scope.userreg.username!='' && $scope.userreg.email!='' && $scope.userreg.password!='' && $scope.userreg.password2!=''){
            if($scope.userreg.password2 == $scope.userreg.password){
                $scope.disableRegButton = false;
            }else{
                $scope.disableRegButton = true;              
            }
        }else{
            $scope.disableRegButton = true;
        }
        if($scope.userreg.password!='' && $scope.userreg.password2!=''){
            if($scope.userreg.password2 == $scope.userreg.password){
                $scope.dupPass = true;
            }else{
                $scope.dupPass = false;              
            }            
        }
        if(typeof($scope.userreg.password2)=='undefined'){
            $scope.dupPass = true;            
        }
    };


});