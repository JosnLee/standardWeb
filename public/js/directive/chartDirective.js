/**
 * 图表自定义指令和服务
 * @author Peter
 * @Date 2016-5-25
 */
angular.module('ImsApp').directive('chart', [function(){
  return {
    restrict: 'AE',
    replace: true,
    scope: {
      config: '=',
      init:'@'
    },
    link: function (scope, element, attrs) {
      var chart = echarts.init($(element).get(0));
      scope.$watch('config',function (newValue,oldValue) {
        console.log(newValue,"kkk")
        if(newValue){
          chart.setOption(newValue)
        }
      })
    }
  };
}]);
