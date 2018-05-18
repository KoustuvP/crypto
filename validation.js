
angular.module('validationModule',[])
    .directive('validationDirective',function(){
        return{
            'restrict': 'E',
            'replace': true,
            'priority': 100,
            'templateUrl': "validation.html",
            transclude: true,
            scope:{
              modal:'=',
              modalToogle:'&'
            },
            controller:function($scope){
                $scope.modalToogle=function(){
                    $scope.modal=false;
                };

                console.log($scope.modalShow,"jjk","hg");
            }

            }

    });