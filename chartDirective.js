
angular.module("chartDirectiveModule",["chartService"])
    .directive("chartDirective",function(){
        return{
            restrict: 'E',
            replace: true,
            templateUrl:"chart.html",
            controller:function(chartService,$scope){
                $scope.setChart=function(){
                    chartService.makeChart(chartService.myData);
                }
            }
        }

});
