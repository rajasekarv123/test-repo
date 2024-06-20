var prefix = window.location.pathname.substr(
  0,
  window.location.pathname.toLowerCase().lastIndexOf("/extensions") + 1
);
var config = {
  host: window.location.hostname,
  prefix: prefix,
  port: window.location.port,
  isSecure: window.location.protocol === "https:",
  routingPrefix: '',
};

require.config({
  baseUrl:
    (config.isSecure ? "https://" : "http://") +
    config.host +
    (config.port ? ":" + config.port : "") +
    config.prefix + "resources"
});


require(["js/qlik"], function (qlik) {
  var app = angular.module("embedTemplate", ["ngRoute"]);

  app.config(function ($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix("");

    $routeProvider
      .when("/overview", {
        templateUrl: "assets/overview.html",
        controller: "mainCtrl",
      })
      .when("/reports", {
        templateUrl: "assets/reports.html",
        controller: "mainCtrl",
      })
      .otherwise({
        redirectTo: "/overview",
        controller: "mainCtrl",
      });

  });

  app.controller("mainCtrl", [
    "$scope",
    "$location",

    function ($scope, $location) {

      $scope.setActiveTab = function () {
        var path = $location.path();
        if (path === "/overview") {
          $scope.activeTab = "overview";
        } else if (path === "/reports") {
          $scope.activeTab = "reports";
        } else {
          $scope.activeTab = "directsheet";
        }
      };
      
      $scope.setActiveTab(); 
      
      $scope.$on("$locationChangeSuccess", function () {
        $scope.setActiveTab(); 
      });

      // #region Customize card modal

      $scope.card = {
        isOpen: false,
        kpis: [
          { kpiNo: "1", kpiName: 'Current Users' },
          { kpiNo: "2", kpiName: 'Average Users' },
          { kpiNo: "3", kpiName: 'Average Session Per User' },
          { kpiNo: "4", kpiName: 'Total Session Per User' },
          { kpiNo: "5", kpiName: 'Average Session Duration' }
        ]
      };
    
      $scope.toggleCard = function() {
        $scope.card.isOpen = !$scope.card.isOpen;
      };

      $scope.onOutSideClick=function(){
        $scope.card.isOpen=false;
      }      

      // #endregion

      // #region filter pannes

      $scope.filterContainerHeight = "50px";
      $scope.showMoreFilters = true;
      $scope.showLessFilters = false;

      $scope.expandFilters = function () {
        $scope.filterContainerHeight = "auto";
        $scope.showMoreFilters = false;
        $scope.showLessFilters = true;
      };

      $scope.collapseFilters = function () {
        $scope.filterContainerHeight = "50px";
        $scope.showLessFilters = false;
        $scope.showMoreFilters = true;
      };

      // #endregion 

      // #region active tabs

      $scope.activetab = 1;

      $scope.ActiveTab = function (chartTab) {
        $scope.activetab = chartTab;
      };

      // #endregion

      // #region Tooltip modal

      $scope.showModal = false;

      $scope.showTooltip = function (event) {
        $scope.showModal = true;
        var icon = event.target;
        var tooltip = document.querySelector(".kpiTooltip-content");

        var iconRect = icon.getBoundingClientRect();

        var tooltipTop = iconRect.top + iconRect.height;
        var tooltipLeft = iconRect.left;

        if ((window.innerWidth / 2) < iconRect.right) {
          tooltip.style.left = '';
          tooltip.style.right = window.innerWidth - iconRect.right + 'px';
        } else {
          tooltip.style.left = tooltipLeft + 'px';
          tooltip.style.right = '';
        }

        tooltip.style.top = tooltipTop + 'px';
      };

      $scope.hideTooltip = function () {
        $scope.showModal = false;
      };

      // #endregion
    },
  ]);

  // #region Profile Modal

  var btn = document.querySelector(".dropdownBtn");

  var dropdownContent = document.querySelector(".dropdown-content");

  btn.addEventListener("click", function () {
    dropdownContent.classList.toggle("show");
  });

  window.addEventListener("click", function (event) {
    if (!event.target.matches(".dropbtn")) {
      var dropdowns = document.querySelectorAll(".dropdown-content");
      for (var i = 0; i < dropdowns.length; i++) {
        var dropdown = dropdowns[i];
        if (dropdown.classList.contains("show")) {
          dropdown.classList.remove("show");
        }
      }
    }
  });

  // #endregion

  angular.bootstrap(document, ["embedTemplate", "qlik-angular"]);
});
