angular.module('starter.directives', [])

.directive('map', function() {
  return {
    restrict: 'E',
    scope: {
      onCreate: '&'
    },
    link: function ($scope, $element, $attr) {
      function initialize() {
        var map = new BMap.Map($element[0]);

        var geolocationControl = new BMap.GeolocationControl();
        geolocationControl.addEventListener("locationSuccess", function(e) {

        });
      
        geolocationControl.addEventListener("locationError", function(e) {
          alert(e.message);
        });
        map.addControl(geolocationControl);

        var geolocation = new BMap.Geolocation();
        geolocation.getCurrentPosition(function(r) {
            if (this.getStatus() == BMAP_STATUS_SUCCESS) {
              var marker = new BMap.Marker(r.point);
              map.addOverlay(marker);
              map.centerAndZoom(r.point, 16);

            } else {
              alert('failed' + this.getStatus());
            }
        },{enableHighAccuracy: false});

        $scope.onCreate({map: map});
//      $scope.map = map;
      }

      window.onload = initialize;
//    window.onreload = initialize;
    }
  }
});
