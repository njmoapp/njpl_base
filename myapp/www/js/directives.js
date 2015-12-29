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
            map.addOverlay(marker);
          }

          /*
          var bounds = map.getBounds();
          var lngSpan = bounds.getNorthEast().lng - bounds.getSouthWest().lng;
          var latSpan = bounds.getNorthEast().lat - bounds.getSouthWest().lat;
          map.clearOverlays();
          for (var i = 0; i < 20; i++) {
            var x = bounds.getSouthWest().lng + lngSpan * (Math.random() * 0.7 + 0.15);
            var y = bounds.getSouthWest().lat + latSpan * (Math.random() * 0.7 + 0.15);
            var point = new BMap.Point(x, y);
            addMarker(point);
          }*/
          
          var geoloc = new BMap.Geolocation();
          geoloc.getCurrentPosition(function(r) {
            if (this.getStatus() == BMAP_STATUS_SUCCESS) {
              //console.log(r.point.lng + ", " + r.point.lat);
              //var circle = new BMap.Circle(r.point, 1400, { fillColor: "blue",
              //                                              strokeWeight: 1,
              //                                              fillOpacity: 0.3});
              //map.addOverlay(circle);
              var local = new BMap.LocalSearch(map, {renderOptions:
                              {map: map, autoViewport: false } } );
              local.searchNearby('停车场', r.point, 1000);
            }        
          });
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
