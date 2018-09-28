
var app=angular.module("myApp",['ngRoute',"homeModule","chartModule",'appServiceModule','logoModule','ngAnimate','outputModule']);
app.config(['$routeProvider',function($routeProvider){
    $routeProvider.when("/",{
        templateUrl:"homePage.html",
        controller:"homeCtrl"
    }).
        when("/output",{
            templateUrl:"output.html"

        }).
        when("/about",{
            templateUrl:"about.html"
        }).
        when("/chart",{
            templateUrl:"chart.html",
            controller:"chartCtrl"
        }).
        when("/logo",{
            templateUrl:"logos.html",
            controller:"logoCtrl"
        }).
        when("/contact",{
            templateUrl:"info.html"
        }).
    when("/login",{
        templateUrl:"copyHash.html"
    }).
        otherwise({redirectTo:"/"})
}]);
app.controller('myCtrl',function($scope,$http,$location,dateFilter,orderByFilter,chartService,appService,$window){
    $location.path("/");
    $scope.init=function(){
    $scope.getCoin();
    };
    $scope.getCoin=function(){
        var finalUrl="coins/list.json";
        appService.httpMethodCall(finalUrl,$scope.getCoinCallBack);
    };
    $scope.getCoinCallBack=function(response){
        chartService.coinList=response.coins;
       chartService.validCoins =Object.keys(response.coins) ;
        console.log(chartService.validCoins);
        console.log(chartService.coinList);
    };

    $scope.init();
});
