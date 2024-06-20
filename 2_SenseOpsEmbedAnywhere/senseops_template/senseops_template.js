/*
 * Basic responsive mashup template
 * @owner Enter you name here (xxx)
 */
/*
 *    Fill in host and port for Qlik engine
 */
var prefix = window.location.pathname.substr(
  0,
  window.location.pathname.toLowerCase().lastIndexOf("/extensions") + 1
);
var config = {
  host: window.location.hostname,
  prefix: prefix,
  port: window.location.port,
  isSecure: window.location.protocol === "https:",
};
require.config({
  baseUrl:
    (config.isSecure ? "https://" : "http://") +
    config.host +
    (config.port ? ":" + config.port : "") +
    config.prefix +
    "resources",
});

require(["js/qlik"], function (qlik) {
  qlik.on("error", function (error) {
    $("#popupText").append(error.message + "<br>");
    $("#popup").fadeIn(1000);
  });
  $("#closePopup").click(function () {
    $("#popup").hide();
  });

  //callbacks -- inserted here --
  //open apps -- inserted here --
  //get objects -- inserted here --
  //create cubes and lists -- inserted here --

  //medium-kpi tabs one

  //Angular

  var senseApp = angular.module("senseops_template", ["ngRoute"]);

  senseApp.controller(
    "myAppCtrl",
    function ($scope, $rootScope, $location, $window, $timeout) {
      // $scope.captureAndDownload = function () {
      //   var body = document.body;
      //   var html = document.documentElement;
      //   var dashboard = document.getElementById("mainDashboard");
      //   var width = Math.max(
      //     body.scrollWidth,
      //     body.offsetWidth,
      //     html.clientWidth,
      //     html.scrollWidth,
      //     html.offsetWidth
      //   );
      //   var height = Math.max(
      //     body.scrollHeight,
      //     body.offsetHeight,
      //     html.clientHeight,
      //     html.scrollHeight,
      //     html.offsetHeight,
      //     dashboard.offsetHeight,
      //     dashboard.scrollHeight,
      //     dashboard.clientHeight
      //   );
      // var screenshotCanvas = document.createElement("canvas");
      // var screenshotContext = screenshotCanvas.getContext("2d");
      // screenshotCanvas.width = width;
      // screenshotCanvas.height = height;
      // var scrollHeight = 0;
      // var windowHeight = $window.innerHeight;

      //   domtoimage
      //     .toPng(document.documentElement, {
      //       width: width,
      //       height: height,
      //       useCORS: true,
      //     })
      //     .then(function (dataUrl) {
      //       var link = document.createElement("a");
      //       link.href = dataUrl;
      //       link.download = "website_capture.png";
      //       link.click();
      //     });
      // };

      // const app = qlik.openApp("03caf2a7-2d1a-4617-a149-8fa43e0ddca3", config);
      // app.getObject("dashboardFilter1", "YcGzvE");
      // app.getObject("dashboardFilter2", "ZaMpSCN");

      // console.log($location.path().substr(1));
      if (!!$location.path().substr(1)) {
        $scope.currentTab = $location.path().substr(1); // Extract the tab from the current URL path
        $scope.header =
          $scope.currentTab[0].toUpperCase() + $scope.currentTab.slice(1);
      }
      $scope.$on("$routeChangeSuccess", function () {
        $scope.currentTab = $location.path().substr(1); // Update the current tab when the route changes
        $scope.header =
          $scope.currentTab[0].toUpperCase() + $scope.currentTab.slice(1);
      });
      $scope.expandCollapse = () => {
        if ($scope.expandSidebar === "expand") {
          $scope.expandSidebar = "collapse";
        } else {
          $scope.expandSidebar = "expand";
        }
      };
      $rootScope.showExport = false;
      $rootScope.exportOptionStyle = {};
      $rootScope.exportOptionItemStyle = {};
      $rootScope.preDivId = "chart";
      $scope.toggleExport = function (event, preDivId) {
        $rootScope.showExport = !$rootScope.showExport;
        $rootScope.preDivId = preDivId;
        $timeout(function () {
          if ($rootScope.showExport) {
            let element = angular.element(
              document.querySelector("#" + preDivId + "ExportOption")
            );
            var height = element.prop("offsetHeight");
            let width = element.prop("offsetWidth");
            console.log(width, height);
            let spanRect = event.target.getBoundingClientRect();
            console.log(spanRect, width, element);
            $rootScope.exportOptionStyle = {
              top: spanRect.top + 10 + "px",
              left: spanRect.left - width + "px",
              "z-index": 100,
            };
            $rootScope.exportOptionItemStyle = {
              "z-index": 100,
            };
          }
        });
      };
      $rootScope.closeOption = function () {
        $rootScope.showExport = false;
      };
      var path = $location.path();
      if (path == "/Sales Analysis") {
        $scope.activeTab = "Sales Analysis";
        $scope.activeMediumKPITab1 = "Salesperson";
        $scope.activeMediumKPITab2 = "Country";
      } else if (path == "/analysis") {
        $scope.activeTab = "analysis";
        $scope.activeMediumKPITab1 = "City";
        $scope.activeMediumKPITab2 = "Category";
        $scope.activeMediumKPITab3 = "Salesperson";
      } else if (path == "/reports") {
        $scope.activeTab = "reports";
      } else {
        $scope.activeTab = "Sales Analysis";
        $scope.activeMediumKPITab1 = "Salesperson";
        $scope.activeMediumKPITab2 = "Country";
      }
      $scope.setActiveTab = function (tab) {
        $scope.activeTab = tab;
      };
      $scope.setMediumKPIActiveTab1 = function (tab) {
        $scope.activeMediumKPITab1 = tab;
      };
      $scope.setMediumKPIActiveTab2 = function (tab) {
        $scope.activeMediumKPITab2 = tab;
      };
      $scope.setMediumKPIActiveTab3 = function (tab) {
        $scope.activeMediumKPITab3 = tab;
      };
    }
  );

  senseApp.config(function ($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix("");
    $routeProvider
      .when("/Sales Analysis", {
        templateUrl: "assets/dashboard.html",
        controller: "myAppCtrl",
      })
      .when("/analysis", {
        templateUrl: "assets/analysis.html",
        controller: "myAppCtrl",
      })
      .when("/reports", {
        templateUrl: "assets/reports.html",
        controller: "myAppCtrl",
      })
      .otherwise({
        redirectTo: "/Sales Analysis",
        controller: "myAppCtrl",
      });
  });

  angular.bootstrap(document, ["senseops_template", "qlik-angular"]);
});
