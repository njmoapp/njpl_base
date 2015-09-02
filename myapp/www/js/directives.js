angular.module('starter.directives', [])

.directive('appMap', function() {
  return {
    restrict: 'E',
    replace: true,
    template: "<div id='allMap'></div>",
    scope: {
      onCreate: '&',
      center: "=",
      markers: "=",
      width: "@",
      height: "@",
      scaleControl: "@",
      address: "@"
    },

    link: function ($scope, $element, $attr) {
      var map = new BMap.Map("allMap");
      var myGeo = new BMap.Geocoder();
      var geolocationControl = new BMap.GeolocationControl();
      geolocationControl.addEventListener("locationSuccess", function(e) {
      });
      geolocationControl.addEventListener("locationError", function(e) {
        alert(e.message);
      });
      map.addControl(geolocationControl);

      myGeo.getPoint($scope.address, function(point) {
        if (point) {
          map.centerAndZoom(point, 16);
          map.addOverlay(new BMap.Marker(point));
        }
      }, "");

      var geolocation = new BMap.Geolocation();
      geolocation.getCurrentPosition(function(r) {
         if (this.getStatus() == BMAP_STATUS_SUCCESS) {
              var marker = new BMap.Marker(r.point);
              map.addOverlay(marker);
              map.centerAndZoom(r.point, 16);

         } else {
              alert('failed' + this.getStatus());
         }
      }, {enableHighAccuracy: true});

      $scope.onCreate({map: map});

      // function initialize() {
      //   var map = new BMap.Map($element[0]);

      //   var geolocationControl = new BMap.GeolocationControl();
      //   geolocationControl.addEventListener("locationSuccess", function(e) {

      //   });
      
      //   geolocationControl.addEventListener("locationError", function(e) {
      //     alert(e.message);
      //   });
      //   map.addControl(geolocationControl);

      //   var geolocation = new BMap.Geolocation();
      //   geolocation.getCurrentPosition(function(r) {
      //       if (this.getStatus() == BMAP_STATUS_SUCCESS) {
      //         var marker = new BMap.Marker(r.point);
      //         map.addOverlay(marker);
      //         map.centerAndZoom(r.point, 16);

      //       } else {
      //         alert('failed' + this.getStatus());
      //       }
      //   },{enableHighAccuracy: false});

      //   $scope.onCreate({map: map});
      // }

      // window.onload = initialize;
    }
  }
});
