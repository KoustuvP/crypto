
angular.module('logoModule',['chartModule','appServiceModule'])
    .controller('logoCtrl',function($scope,chartService,$location,appService){
        $scope.colorClass={'background-color':''};
        $scope.drillDown=false;
        $scope.imageList=chartService.validCoins;
        $scope. x=[];
        _.each( $scope.imageList,function(coin){
            $scope.x.push(chartService.coinList[coin])
        });
        $scope.getResult=function(code){
            $scope.drillDown=true;
            $scope.coinName=chartService.coinList[code]['coinName'];
            var finalUrl="coins/"+code+".json";
            $scope.data=null;
            appService.httpMethodCall(finalUrl,$scope.callBack,$scope.errorCallBack);
        };
        $scope.callBack=function(response){
            $scope.data=response['forecast'];
            console.log(chartService.myData);
            chartService.setData($scope.data);
            chartService.makeChart("serial");
            console.log(chartService.myData);
        };
        $scope.goBack=function(){
            $scope.drillDown=false;
        };
        $scope.errorCallBack=function(){
            $scope.drillDown=false;
        };
        $scope.getColorForLogo=function(id){
            var clazz={};
            if(id%3==0){
                clazz['btn-info'] = true;
            }
            else if(id%2==0){
                clazz['btn-default'] = true;
            }
            else if(id%5==0){
                clazz['btn-danger'] = true;
            }
            else if(id%7==0){
                clazz['btn-warning'] = true;
            }
            else if(id%11==0){
                clazz['btn'] = true;
            }

            else
                clazz['btn-success']=true;
            return clazz;

        }
    });
