
angular.module('appServiceModule',[])
    .factory('appService',function($http){
        var httpMethodCall=function(finalUrl,callBack,errorCallBack){
            $http.get(finalUrl)
                .success(function(response){
                    callBack(response);
                }).error(function(response){
                    console.log(response);
                    errorCallBack();
                });
        };
        return{
            'httpMethodCall':httpMethodCall
        }
    });
