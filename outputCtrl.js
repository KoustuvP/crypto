angular.module("outputModule",['chartModule','appServiceModule'])
    .directive("outputDirective",function(){
        return{
            restrict: 'E',
            replace: true,
            templateUrl:"outputDirective.html",
            scope:{
                data:"=",
                code:"=",

                getChartClass:"&"
            },
            controller:function(chartService,$scope,$location){
                $scope.chartState=false;

                $scope.init=function(){
                    $scope.data=chartService.myData;
                    // $scope.coinName=chartService.coinList[code]['coinName'];
                    console.log($scope.data,$scope.code,$scope.coinName);
                    if($scope.chartState){
                        var chart=["pie","serial"];
                        chart.splice(chart.indexOf($scope.chartType),1);
                        chartService.makeChart(chart[0]);
                        $scope.chartType=chart[0];
                        return;
                    }
                    else {
                        $scope.chartState=true;
                        $scope.chartType = "pie";
                        chartService.makeChart($scope.chartType);
                    }
                };
                $scope.goBack=function(){
                    $scope.drillDown=false;
                    $location.path("/");
                };
                $scope.getClass=function(id) {
                    var clazz = {};
                    if(id%2==0){
                        clazz['even-class']=true;
                    }
                    else
                        clazz['odd-class']=true;
                    return clazz;
                };
                $scope.init();
            }
        }
    });
