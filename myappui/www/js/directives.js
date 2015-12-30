angular.module('app.directives', [])


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

      // Add a test control
      function TestControl() {
      	this.defaultAnchor = BMAP_ANCHOR_BOTTOM_RIGHT;
      	this.defaultOffset = new BMap.Size(10, 110);
      }
      TestControl.prototype = new BMap.Control();
      TestControl.prototype.initialize = function(map) {
      	var div = document.createElement("div");
      	div.appendChild(document.createTextNode("TEST"));
        div.style.cursor = "pointer";
        div.style.border = "1px solid gray";
        div.style.background = "red";
      	div.onclick = function(e) {
      	  function addMarker(point) {
            var marker = new BMap.Marker(point);;
            marker.addEventListener("click", function(){    
              alert("you click the marker.");    
            });
            map.addOverlay(marker);
          }

          var bounds = map.getBounds();
          var lngSpan = bounds.getNorthEast().lng - bounds.getSouthWest().lng;
          var latSpan = bounds.getNorthEast().lat - bounds.getSouthWest().lat;
          map.clearOverlays();
          for (var i = 0; i < 30; i++) {
            var x = bounds.getSouthWest().lng + lngSpan * (Math.random() * 0.7 + 0.15);
            var y = bounds.getSouthWest().lat + latSpan * (Math.random() * 0.7 + 0.15);
            var point = new BMap.Point(x, y);
            addMarker(point);
          }
      	}
      	map.getContainer().appendChild(div);
        return div;
      }
      map.addControl(new TestControl());

      // Add a clear button
      function ClearControl() {
      	this.defaultAnchor = BMAP_ANCHOR_BOTTOM_RIGHT;
        this.defaultOffset = new BMap.Size(10, 60);
      }
      ClearControl.prototype = new BMap.Control();
      ClearControl.prototype.initialize = function(map) {
      	var div = document.createElement("div");
      	div.appendChild(document.createTextNode("CLEAR"));
        div.style.cursor = "pointer";
        div.style.border = "1px solid gray";
        div.style.background = "gray";
      	div.onclick = function(e) {
      		map.clearOverlays();
      	}
      	map.getContainer().appendChild(div);
        return div;
      }
      map.addControl(new ClearControl());


      // Add a parking control
      function ParkSearchControl() {
        this.defaultAnchor = BMAP_ANCHOR_BOTTOM_RIGHT;
        this.defaultOffset = new BMap.Size(10, 10);
      }
      ParkSearchControl.prototype = new BMap.Control();
      ParkSearchControl.prototype.initialize = function(map) {
        var div = document.createElement("div");
        div.appendChild(document.createTextNode("停车场"));
        div.style.cursor = "pointer";
        div.style.border = "1px solid gray";
        div.style.background = "yellow";
        div.onclick = function(e) {
          
          var geoloc = new BMap.Geolocation();
          geoloc.getCurrentPosition(function(r) {
            if (this.getStatus() == BMAP_STATUS_SUCCESS) {
              console.log(r.point.lng + ", " + r.point.lat);
              map.clearOverlays();
              var circle = new BMap.Circle(r.point, 1400, { fillColor: "blue",
                                                            strokeWeight: 1,
                                                            fillOpacity: 0.3});
              map.addOverlay(circle);
              var local = new BMap.LocalSearch(map, {renderOptions:
                              {map: map, autoViewport: false } } );
              local.searchNearby('停车场', r.point, 1000);
            }        
          });
        }
        map.getContainer().appendChild(div);
        return div;
      }
      map.addControl(new ParkSearchControl());

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

      //$scope.onCreate({map: map});
    }
  }
})

.directive('blankDirective', [function(){

}]);

