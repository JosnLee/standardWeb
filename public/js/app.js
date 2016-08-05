angular.module('ImsApp', ["ui.router", "ui.bootstrap", "ngSanitize", "blockUI", "ngAnimate", "ngLocale",'s.pagination','angularFileUpload','bootstrapLightbox'])
  .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $stateProvider

    // Each tab has its own nav history stack:
    //数据中心
      .state(stateObj("DataCenter","UserData"))
      .state(
        stateObj("DataCenter","ADData")
      )
      //广告主
      .state(
        stateObj("AdvertisementCenter","AdvertiserMaintenance")
      )
      .state(
        stateObjWithParam("AdvertisementCenter","AdvertiserMaintenance","/:advertiserId")
      )
      .state(
        stateObj("AdvertisementCenter","Sources")
      )
      .state(
        stateObj("AdvertisementCenter","Advertiser")
      )

      //广告计划
      .state(
        stateObj("AdvertisementCenter","ADPlan")
      )
      .state(
        stateObjWithParam("AdvertisementCenter","ADPlan","/:advertiserId/:shortName")
      )

      .state(
        stateObj("AdvertisementCenter","ADPlanMaintenance")
      )
      .state(
        stateObjWithParam("AdvertisementCenter","ADPlanMaintenance","/:campaignId/:advertiserId")
      )

      //推广组
      .state(
        stateObj("AdvertisementCenter","PromotionGroup")
      )
      .state(
        stateObjWithParam("AdvertisementCenter","PromotionGroup","/:campaignId/:adStyle/:advertiserId")
      )
      .state(
        stateObj("AdvertisementCenter","PGMaintenance")
      )
      .state(
        stateObjWithParam("AdvertisementCenter","PGMaintenance","/:advertiserId/:campaignId/:groupId/:adStyle")
      )
      //创意
      .state(
        stateObj("AdvertisementCenter","ADCreative")
      )
      .state(
        stateObjWithParam("AdvertisementCenter","ADCreative","/:campaignId/:groupId/:advertiserId/:adStyle")
      )
      .state(
        stateObj("AdvertisementCenter","ADCMaintenance")
      )
      .state(
        stateObjWithParam("AdvertisementCenter","ADCMaintenance","/:advertiserId/:campaignId/:groupId/:adStyle/:creativeId")
      )
      //渠道
      .state(
        stateObj("AdvertisementCenter","Channel")
      )
      .state(
        stateObj("AdvertisementCenter","ChannelMaintenance")
      )
      .state(
        stateObjWithParam("AdvertisementCenter","ChannelMaintenance","/:channelId")
      )
      //渠道统计
      .state(
        stateObj("AdvertisementCenter","ChannelStatistic")
      )
      .state(
        stateObjWithParam("AdvertisementCenter","ChannelStatistic","/:channelId")
      )
      //应用
      .state(
        stateObj("AdvertisementCenter","App")
      )
      .state(
        stateObjWithParam("AdvertisementCenter","App","/:channelId")
      )
      .state(
        stateObj("AdvertisementCenter","AppMaintenance")
      )
      .state(
        stateObjWithParam("AdvertisementCenter","AppMaintenance","/:channelId/:appId")
      )
      //应用统计
      .state(
        stateObj("AdvertisementCenter","AppStatistic")
      )
      .state(
        stateObjWithParam("AdvertisementCenter","AppStatistic","/:appId")
      )

      //计划与推广组统计
      .state(
        stateObj("AdvertisementCenter","Statistic")
      )
      .state(
        stateObjWithParam("AdvertisementCenter","Statistic","/:module/:id/:camId/:advertiserId/:adStyle")
      )
      //广告合约
      .state(
        stateObj("ContractCenter","ADContract")
      )
      .state(
        stateObj("ContractCenter","ADContractMaintenance")
      )
      .state(
        stateObjWithParam("ContractCenter","ADContractMaintenance","/:id/:shortName")
      )
      //渠道合约
      .state(
        stateObj("ContractCenter","SourcesContract")
      )
      .state(
        stateObj("ContractCenter","SourcesContractMaintenance")
      )
      .state(
        stateObjWithParam("ContractCenter","SourcesContractMaintenance","/:id/:shortName")
      )
      //日志表
      .state(
        stateObj("ManagerSystem","LogList")
      )
      //帐号管理
      .state(
        stateObj("ManagerSystem","AccountManagement")
      )
      //索引管理
      .state(
        stateObj("ManagerSystem","IndexManagement")
      )

      //内容中心
      .state(
        stateObj("ContentCenter","Content")
      )
      .state(
        stateObj("ContentCenter","FMList")
      )
      .state(
        stateObjWithParam("ContentCenter","FMList","/:aid")
      )
      .state(
        stateObj("ContentCenter","Album")
      )
      //渠道主
      .state(
        stateObj("DataStatistics","DataStatistics")
      )
      .state(
        stateObj("ModifyPassword","ModifyPassword")
      )
      //广告主
      .state(
        stateObj("AdvDataStatistics","AdvDataStatistics")
      )
      .state(
        stateObj("AdvModifyPassword","AdvModifyPassword")
      ).state(
      stateObj("login","login")
    )
    //  其他情况跳转
    $urlRouterProvider.otherwise(function($injector, $location){
      window.location ='http://'+ window.location.host +"/website/website.html";
    });

}]).filter("includedByState", ["$state", function ($state) {
  return function (data) {
    return $state.includes(data) ? "active" : "";
  };
}]).filter("toArray", function () {
  return function (data, separator) {
    var array = [];
    if (data) {
      if (!separator) {
        separator = ",";//默认分割器
      }
      var arr = data.split(separator);
      for (var i = 0; i < arr.length; i++) {
        array.push(arr[i]);
      }
    }
    return array;
  };
}).filter("formatDate", function () {
  return function (data, connector) {
    if (data == "") {
      data = null;
    } else {
      if (!angular.isDate(data)) {
        data = new Date(data);
      }
      if (!connector) {
        connector = "-";//默认连接器
      }
      var year = data.getFullYear();
      var month = data.getMonth() + 1;
      var day = data.getDate();
      return year + connector + (month < 10 ? "0" + month : month) + connector + (day < 10 ? "0" + day : day);
    }
  };
});




var stateObj = function(parentName, childName) {
  return {
    name: childName,
    url: "/"+ parentName +"/" + childName,
    templateUrl: "tplsrc/"+ parentName +"/" + childName + ".html",
    controller: childName+'Controller'
    //可使用resolve为控制器提供可选的依赖注入项。

  };
};
var stateObjWithParam = function(parentName, childName, param) {
  return {
    name: childName  + ".param",
    url: param,
    templateUrl: "tplsrc/"+ parentName +"/" + childName + ".html",
    controller: childName+'Controller'
  };
};
