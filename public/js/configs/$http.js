/**
 * 拦截response，统一返回｛code：200，data：data｝
 */

angular.module('ImsApp')
  .config(['$httpProvider', function ($httpProvider) {
    $httpProvider.interceptors.push([function () {
      return {
        'request': function (config, body) {
          var userInfo = JSON.parse(localStorage.getItem('userInfo'));
          config.headers['X-Auth-Token'] = "JSESSIONID=" + userInfo.sessionId + "; name=" + userInfo.user.userName + "; psw=" + userInfo.pwd;
          return config;
        }
      }
    }]);
  }]).config(['blockUIConfig', function (blockUIConfig) {
  // 修改默认的提示信息
  blockUIConfig.message = "加载中...";
  // 修改UI不可见时默认的延迟时间为100ms
  blockUIConfig.delay = 100;
  // 禁用自动阻塞页面展示配置项
  blockUIConfig.autoBlock = false;
}])
