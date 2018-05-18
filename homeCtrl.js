angular.module("homeModule",['chartModule','appServiceModule'])
    .controller("homeCtrl",function($scope,chartService,appService,$location){

        $scope.currencyCode='';
        $scope.coinName='';
        $scope.chartType='';
        $scope.drillDown=false;
        $scope.modalShow=false;
        $scope.getResult=function(code,x){
            $scope.modalShow=true;
            if(x){
                var chart=["pie","serial"];
                chart.splice(chart.indexOf($scope.chartType),1);
                chartService.makeChart(chart[0]);
                $scope.chartType=chart[0];
                return;
            }
            var validCode=_.contains(chartService.validCoins,code);
            if(!validCode){
                $scope.modalShow=true;
                return
            }
            else
                $scope.currencyCode=code;
            $scope.modalShow=false;
            $scope.drillDown=true;
            var finalUrl="coins/"+code+".json";
            //"https://infinite-depths.herokuapp.com/forecast?code="+code;
             $scope.data=null;
            $scope.chartType="pie";
            appService.httpMethodCall(finalUrl,$scope.callBack);
        };
        $scope.callBack=function(response){
            $scope.data=response['forecast'];
            chartService.setData($scope.data);
            console.log(chartService.myData);
            $location.path("/output");
        };

        $scope.hoveringEffect=function(hover){
            if(hover)
            {
                angular.element("#btnDiv").css("left","41px");
                angular.element(".caret-right").css({
                    "left":"41px",
                    "border-left": "12px transparent",
                    "border-right":"12px solid"
                })
            }
            else {
                angular.element("#btnDiv").css("left", "-3%");
                angular.element(".caret-right").css({
                    "left": "-3%",
                    "border-left": "12px solid",
                    "border-right":"12px transparent"
                })
            }
        };
});
