/**
 * Created by Kaustuv on 4/21/2018.
 */
    var chartModule=angular.module('chartModule',['validationModule','appServiceModule']);
chartModule.factory('chartService',function(dateFilter) {
  var makeChart = function (type,isMulti) {
      var defaultChartData={};
      defaultChartData.type=type;
      defaultChartData.theme="light";
      defaultChartData.dataProvider = this.myData;
      defaultChartData.categoryField = "TimeStamp";
          if (type === "pie") {
              var chart = new AmCharts.AmPieChart();
              angular.extend(chart,defaultChartData);
              chart.valueField="Price";
              chart.titleField="TimeStamp";
              chart.colorField="color";
              chart.labelRadius=5;
              chart.labelText="[[title]]";
              chart.marginTop=0;
              chart.marginBottom=0;
              chart.write( "chartdiv" );
              return;
          }
          else if(type==="serial") {
              var data = this.myData;
              // chart code will go here
              chart = new AmCharts.AmSerialChart();
              angular.extend(chart, defaultChartData);
              if (isMulti) {

                          chart.valueAxes= [
                              {
                                  "gridColor": "#FFFFFF",
                                  "gridAlpha": 0.2,
                                  "dashLength": 0
                              }
                          ];
                          chart.gridAboveGraphs= true,
                          chart.startDuration=1;
                          chart.graphs= [
                              {
                                  "title": "First Coin",
                                  "balloonText": "[[title]]: <b>[[value]]</b>",
                                  "bullet": "round",
                                  "bulletSize": 10,
                                  "bulletBorderColor": "#ffffff",
                                  "bulletBorderAlpha": 1,
                                  "bulletBorderThickness": 2,
                                  "valueField": "value1"
                              },
                              {
                                  "title": "Second Coin",
                                  "balloonText": "[[title]]: <b>[[value]]</b>",
                                  "bullet": "round",
                                  "bulletSize": 10,
                                  "bulletBorderColor": "#ffffff",
                                  "bulletBorderAlpha": 1,
                                  "bulletBorderThickness": 2,
                                  "valueField": "value2"
                              }
                          ];
                          chart.chartCursor={
                              "categoryBalloonEnabled": false,
                              "cursorAlpha": 0,
                              "zoomable": false
                          };
                          chart.categoryAxis= {
                              "gridPosition": "start",
                              "gridAlpha": 0,
                              "labelRotation": 90
                          };
                          chart.legend= {}
                  chart.write("chartdiv");
                  return

              }
              chart.startDuration = 1;
              chart.angle = 30;
              chart.depth3D = 20;
              var categoryAxis = chart.categoryAxis;
              categoryAxis.labelRotation = 90;
              categoryAxis.autoGridCount = false;
              categoryAxis.gridCount = this.myData.length;
              categoryAxis.gridPosition = "start";
              var graph = new AmCharts.AmGraph();
              graph.valueField = "Price";
              graph.fillColorsField = "color";
              graph.lineColorField = "color";
              graph.balloonText = "[[category]]: <b>[[value]]</b>";
              graph.type = "column";
              graph.fillAlphas = 0.8;
              chart.addGraph(graph);
              console.log(chart);
              chart.write("chartdiv");

          }

          function toggleSlice(item) {
              chart.clickSlice(item);
          }

          function hoverSlice(item) {
              chart.rollOverSlice(item);
          }

          function blurSlice(item) {
              chart.rollOutSlice(item);
          }

      ;
  };


    var setData=function(data,multiSeries){
        var c=[];
        var  label='';
        if(!multiSeries) {
            _.each(data, function (el) {
                console.log(el);
                c.push({
                    "TimeStamp": dateFilter(el.timestamp, "mediumDate"),
                    "Price": el.usd,
                    "color": getColor()
                });
            });
            this.myData = c;
            console.log(c);
        }
        else{
            c.length=0;
            for(var i=0;i<data.length;i++){
                c.push({
                        "TimeStamp":dateFilter(data[i].timestamp, "MMM")+"\n"+dateFilter(data[i].timestamp, "dd"),
                        "value1": data[i].usd,
                        "value2": multiSeries[i].usd
                    }

                )
            }
            this.myData=c;
        }
    };
    var color=[];
    var b=[];
    var getNumber=function(){
        return Math.round(Math.random()*256);

    };
    var getColor=function(id){
        var rValue=getNumber();
        var gValue=getNumber();
        var bValue=getNumber();
        var x="rgb("+rValue+","+gValue+","+bValue+")";
        return x;
    };
    return{
        coinList:{},
        validCoins:[],
        myData:[],
        makeChart: makeChart,
        setData:setData,
        getColor:getColor
    };
});
chartModule.controller('chartCtrl',function($scope,chartService,appService) {
        $scope.modalShow=false;
        $scope.firstCoinCallBack=function(response){
            $scope.data1 = response['forecast'];
            appService.httpMethodCall($scope.link2,$scope.secondCoinCallBack);
        };
    $scope.secondCoinCallBack=function(response){
        $scope.data2 = response['forecast'];
        chartService.setData($scope.data1, $scope.data2);
        chartService.makeChart("serial","multiSeries");
    };
        $scope.chartComparison = function () {

            $scope.modalShow=true;
            $scope.link1 ="coins/" + $scope.firstCode+".json";
            $scope.link2 = "coins/" + $scope.secondCode+".json";
            var validCode1=_.contains(chartService.validCoins, $scope.firstCode);
            var validCode2=_.contains(chartService.validCoins,$scope.secondCode);
            if(!validCode1 || !validCode1){
                $scope.modalShow=true;
                $scope.clicked=false;
                return
            }
            else{
                $scope.modalShow=false;
                $scope.clicked=true;
            }
            $scope.clicked=true;
            appService.httpMethodCall($scope.link1,$scope.firstCoinCallBack);
        }

});




