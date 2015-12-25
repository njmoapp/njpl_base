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

      // Add a customized control
      function ZoomControl() {
        this.defaultAnchor = BMAP_ANCHOR_BOTTOM_LEFT;
        this.defaultOffset = new BMap.Size(10, 70);
      }
      ZoomControl.prototype = new BMap.Control();
      ZoomControl.prototype.initialize = function(map) {
        var div = document.createElement("div");
        div.appendChild(document.createTextNode("停车场"));
        div.style.cursor = "pointer";
        div.style.border = "1px solid gray";
        div.style.background = "yellow";
        div.onclick = function(e) {
          function addMarker(point) {
            var marker = new BMap.Marker(point);
            marker.addEventListener("click", function(){    
              alert("you click the marker.");    
            });
            $scope.map.addOverlay(marker);
          }
          var bounds = map.getBounds();
          var lngSpan = bounds.maxX - bounds.minX;
          var latSpan = bounds.maxY - bounds.minY;
          console.log("lngSpan=" + lngSpan + ", latSpan=" + latSpan);
          for (var i = 0; i < 10; i++) {
            var ptx = bounds.minX + lngSpan * (Math.random() * 0.7 + 0.15);
            var pty = bounds.minY + latSpan * (Math.random() * 0.7 + 0.15);
            console.log("making points ..." + i + ": " + 100*ptx + ", " + 100*pty);
            var point = new BMap.Point(x, y);
            addMarker(point);
          }
        }
        map.getContainer().appendChild(div);
        return div;
      }
      map.addControl(new ZoomControl());


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
